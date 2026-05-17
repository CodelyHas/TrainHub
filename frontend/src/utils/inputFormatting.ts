export function lettersAndSpacesOnly(value: string) {
  return value.replace(/[^\p{L}\s]/gu, "");
}

export function cityNameCharactersOnly(value: string) {
  return value.replace(/[^\p{L}\s.'-]/gu, "");
}