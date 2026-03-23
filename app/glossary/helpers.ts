export const updateQuery = ({
  searchParams,
  name,
  value,
}: {
  searchParams: URLSearchParams;
  name: string;
  value: string;
}): string => {
  const currentParams = new URLSearchParams(Array.from(searchParams.entries()));

  if (["", null, undefined].includes(value)) {
    currentParams.delete(name);
  } else {
    currentParams.set(name, value);
  }

  const search = currentParams.toString();
  return search ? `?${search}` : "";
};
