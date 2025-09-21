"use client";

import { ACTION_TYPE } from "@/components/providers/audio-bar-provider";
import { ActionDispatch, createContext } from "react";

/**
 * React context for dispatching audio player state changes
 *
 * @remarks
 * Provides access to the dispatch function that allows components to
 * update the audio player state. Used alongside AudioBarContext to
 * create a complete state management solution for the audio player.
 *
 * The context value is nullable and must be checked before use.
 * Components should use the useAudioBarDispatchContext hook which
 * includes proper error handling for missing providers.
 *
 * @see {@link useAudioBarDispatchContext} for safe access to this context
 */
export const AudioBarDispatchContext = createContext<ActionDispatch<
	[action: ACTION_TYPE]
> | null>(null);
