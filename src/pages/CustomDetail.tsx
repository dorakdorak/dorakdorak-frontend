import { useParams } from "react-router-dom";

function CustomDetail() {
  const { id } = useParams();

  return (
    <div>
      <h2>커스텀 도시락 상세 페이지</h2>
      <p>선택한 도시락 ID: {id}</p>
    </div>
  );
}

export default CustomDetail;
