import audioBarAtom from "@/components/atoms/audio-bar-atom";
import { ExtractAtomValue } from "jotai";

export type AudioBarAtomType = ExtractAtomValue<typeof audioBarAtom>;
