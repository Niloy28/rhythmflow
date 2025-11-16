import { atom } from "jotai";

/**
 * Jotai atom to manage the global audio bar state
 */
const audioBarAtom = atom({
	songID: "",
	songName: "",
	artist: "",
	album: "",
	year: "",
	albumArt: "",
	audioSrc: "",
	isLiked: false,
	volume: 0.5,
});

export default audioBarAtom;
