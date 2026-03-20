import mockData from "../mockData";

export default function MovementDetails({
  movementId,
}: {
  movementId: number;
}) {
  const movement = mockData.find(({ id }) => id === movementId);
  return (
    <div>
      <h3>
        {movement?.name} ({movement?.level.name})
      </h3>
      <p>{movement?.description}</p>
      <p>{movement?.category.name}</p>
    </div>
  );
}
