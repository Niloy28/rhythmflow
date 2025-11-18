"use client";

import { useHydrateAtoms } from "jotai/utils";
import audioBarAtom from "./audio-bar-atom";
import { AudioBarAtomType } from "@/types/atom-types";

/**
 * Hydrate atoms with initial values on first render
 * @param atomValues - Initial values for Jotai atoms to hydrate
 * @param children - Child components that will have access to the hydrated atoms
 * @returns
 */
export const AtomsHydrator = ({
	atomValues,
	children,
}: {
	atomValues: AudioBarAtomType;
	children: React.ReactNode;
}) => {
	useHydrateAtoms([[audioBarAtom, atomValues]]);
	return children;
};
