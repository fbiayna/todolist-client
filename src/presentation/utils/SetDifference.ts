export default function difference<T>(setA: Set<T>, setB: Set<T>) {
  let _difference = new Set(setA);
  for (let elem of setB) {
    _difference.delete(elem);
  }
  return _difference;
}
