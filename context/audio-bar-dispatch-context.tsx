"use client";

import { ACTION_TYPE } from "@/components/providers/audio-bar-provider";
import { ActionDispatch, createContext } from "react";

export const AudioBarDispatchContext = createContext<ActionDispatch<
	[action: ACTION_TYPE]
> | null>(null);
