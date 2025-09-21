"use client";

// Inspired by react-hot-toast library
import * as React from "react";

import type { ToastActionElement, ToastProps } from "@/components/ui/toast";

/** Maximum number of toasts that can be displayed simultaneously */
const TOAST_LIMIT = 1;
/** Delay in milliseconds before removing dismissed toasts from memory */
const TOAST_REMOVE_DELAY = 1000000;

/**
 * Extended toast configuration with additional metadata
 */
type ToasterToast = ToastProps & {
	/** Unique identifier for the toast instance */
	id: string;
	/** Optional toast title content */
	title?: React.ReactNode;
	/** Optional toast description/body content */
	description?: React.ReactNode;
	/** Optional action button element */
	action?: ToastActionElement;
};

/**
 * Available action types for toast state management
 */
const actionTypes = {
	ADD_TOAST: "ADD_TOAST",
	UPDATE_TOAST: "UPDATE_TOAST",
	DISMISS_TOAST: "DISMISS_TOAST",
	REMOVE_TOAST: "REMOVE_TOAST",
} as const;

let count = 0;

/**
 * Generates unique sequential IDs for toast instances
 *
 * @returns String representation of unique ID
 *
 * @remarks
 * Uses a simple counter that wraps at Number.MAX_SAFE_INTEGER to ensure
 * uniqueness while preventing memory leaks from ever-growing numbers.
 */
function genId() {
	count = (count + 1) % Number.MAX_SAFE_INTEGER;
	return count.toString();
}

type ActionType = typeof actionTypes;

/**
 * Union type defining all possible toast actions
 */
type Action =
	| {
			type: ActionType["ADD_TOAST"];
			toast: ToasterToast;
	  }
	| {
			type: ActionType["UPDATE_TOAST"];
			toast: Partial<ToasterToast>;
	  }
	| {
			type: ActionType["DISMISS_TOAST"];
			toastId?: ToasterToast["id"];
	  }
	| {
			type: ActionType["REMOVE_TOAST"];
			toastId?: ToasterToast["id"];
	  };

/**
 * Toast state interface
 */
interface State {
	/** Array of currently active toasts */
	toasts: ToasterToast[];
}

/** Map storing timeout references for automatic toast removal */
const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>();

/**
 * Schedules a toast for removal after the configured delay
 *
 * @param toastId - ID of the toast to remove
 *
 * @remarks
 * Prevents duplicate timeouts for the same toast and automatically
 * cleans up the timeout reference when it executes.
 */
const addToRemoveQueue = (toastId: string) => {
	if (toastTimeouts.has(toastId)) {
		return;
	}

	const timeout = setTimeout(() => {
		toastTimeouts.delete(toastId);
		dispatch({
			type: "REMOVE_TOAST",
			toastId: toastId,
		});
	}, TOAST_REMOVE_DELAY);

	toastTimeouts.set(toastId, timeout);
};

/**
 * Reducer function for managing toast state transitions
 *
 * @param state - Current toast state
 * @param action - Action to process
 * @returns New state after applying the action
 *
 * @remarks
 * Handles all toast lifecycle operations including adding, updating,
 * dismissing, and removing toasts. The dismiss action includes side
 * effects for scheduling automatic removal.
 */
export const reducer = (state: State, action: Action): State => {
	switch (action.type) {
		case "ADD_TOAST":
			return {
				...state,
				toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
			};

		case "UPDATE_TOAST":
			return {
				...state,
				toasts: state.toasts.map((t) =>
					t.id === action.toast.id ? { ...t, ...action.toast } : t
				),
			};

		case "DISMISS_TOAST": {
			const { toastId } = action;

			// ! Side effects ! - This could be extracted into a dismissToast() action,
			// but I'll keep it here for simplicity
			if (toastId) {
				addToRemoveQueue(toastId);
			} else {
				state.toasts.forEach((toast) => {
					addToRemoveQueue(toast.id);
				});
			}

			return {
				...state,
				toasts: state.toasts.map((t) =>
					t.id === toastId || toastId === undefined
						? {
								...t,
								open: false,
						  }
						: t
				),
			};
		}
		case "REMOVE_TOAST":
			if (action.toastId === undefined) {
				return {
					...state,
					toasts: [],
				};
			}
			return {
				...state,
				toasts: state.toasts.filter((t) => t.id !== action.toastId),
			};
	}
};

/** Array of listener functions that are notified of state changes */
const listeners: Array<(state: State) => void> = [];

/** Global state store for toast notifications */
let memoryState: State = { toasts: [] };

/**
 * Dispatches an action to update global toast state
 *
 * @param action - Action to process
 *
 * @remarks
 * Updates the global memory state and notifies all registered listeners
 * of the change. This allows multiple components to stay synchronized
 * with the toast state.
 */
function dispatch(action: Action) {
	memoryState = reducer(memoryState, action);
	listeners.forEach((listener) => {
		listener(memoryState);
	});
}

/** Toast configuration type without the auto-generated ID */
type Toast = Omit<ToasterToast, "id">;

/**
 * Creates and displays a new toast notification
 *
 * @param props - Toast configuration options
 * @returns Object with methods to control the created toast
 *
 * @remarks
 * Automatically generates a unique ID and sets up the toast with proper
 * event handlers. Returns methods to update or dismiss the specific toast.
 *
 * @example
 * ```typescript
 * const { dismiss, update } = toast({
 *   title: "Success",
 *   description: "Operation completed successfully"
 * });
 *
 * // Later...
 * update({ description: "Updated message" });
 * // or
 * dismiss();
 * ```
 */
function toast({ ...props }: Toast) {
	const id = genId();

	const update = (props: ToasterToast) =>
		dispatch({
			type: "UPDATE_TOAST",
			toast: { ...props, id },
		});
	const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id });

	dispatch({
		type: "ADD_TOAST",
		toast: {
			...props,
			id,
			open: true,
			onOpenChange: (open) => {
				if (!open) dismiss();
			},
		},
	});

	return {
		id: id,
		dismiss,
		update,
	};
}

/**
 * Hook for managing toast notifications in React components
 *
 * @returns Object containing current toast state and control functions
 *
 * @remarks
 * Provides access to the current toast state and functions to create
 * and manage toast notifications. Automatically subscribes to state
 * changes and cleans up listeners on unmount.
 *
 * The returned `toast` function creates new notifications, while `dismiss`
 * can remove specific toasts or all toasts if no ID is provided.
 *
 * @example
 * ```typescript
 * const { toasts, toast, dismiss } = useToast();
 *
 * const showSuccess = () => {
 *   toast({
 *     title: "Success!",
 *     description: "Your changes have been saved."
 *   });
 * };
 *
 * const clearAll = () => dismiss();
 * ```
 */
function useToast() {
	const [state, setState] = React.useState<State>(memoryState);

	React.useEffect(() => {
		// Subscribe to state changes
		listeners.push(setState);

		// Cleanup subscription on unmount
		return () => {
			const index = listeners.indexOf(setState);
			if (index > -1) {
				listeners.splice(index, 1);
			}
		};
	}, [state]);

	return {
		...state,
		toast,
		dismiss: (toastId?: string) => dispatch({ type: "DISMISS_TOAST", toastId }),
	};
}

export { toast, useToast };
