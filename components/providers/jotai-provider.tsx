import { Provider } from "jotai";
import { AtomsHydrator } from "../atoms/atoms-hydrator";
import { AudioBarAtomType } from "@/types/atom-types";

/**
 * Provider component to access jotai atoms
 * @param children - Child components that will have access to Jotai state
 * @param atomValues - Initial values for Jotai atoms to hydrate
 * @returns
 */
const JotaiProvider = ({
	children,
	atomValues,
}: {
	children: React.ReactNode;
	atomValues: AudioBarAtomType;
}) => {
	return (
		<Provider>
			<AtomsHydrator atomValues={atomValues}>{children}</AtomsHydrator>
		</Provider>
	);
};

export default JotaiProvider;
