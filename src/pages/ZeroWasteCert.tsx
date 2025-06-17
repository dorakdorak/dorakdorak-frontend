import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from "@/components/common/Spinner";
import CertTitle from "@/components/zeroWaste/CertTitle";
import DosirakInfo from "@/components/zeroWaste/DosirakInfo";
import ImageUploadBox from "@/components/zeroWaste/ImageUploadBox";
import PreviewImage from "@/components/zeroWaste/PreviewImage";
import GaugeBar from "@/components/zeroWaste/GaugeBar";
import ResultMessage from "@/components/zeroWaste/ResultMessage";
import { fetchZeroWasteInfo, uploadZeroWasteImage } from "@/api/ZeroWasteCert";
import { ZeroWasteInfo, ZeroWasteResult } from "@/types/ZeroWaste";
import styles from "@/css/zeroWaste/ZeroWasteCert.module.css";

const ZeroWasteCertPage = () => {
  const { qrcode } = useParams<{ qrcode: string }>();
  const [info, setInfo] = useState<ZeroWasteInfo | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [result, setResult] = useState<ZeroWasteResult | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!qrcode) return;
    fetchZeroWasteInfo(qrcode)
      .then((res) => setInfo(res.data))
      .catch(() => {
        alert("도시락 정보를 불러오지 못했습니다.");
        setTimeout(() => {
          window.location.href = "https://dorakdorak.store";
        }, 3000);
      }
      );
      
  }, [qrcode]);

  const analyzeImage = async (file: File) => {
    if (!qrcode) return;
    setLoading(true);
    try {
      const res = await uploadZeroWasteImage(qrcode, file);
      console.log('응답 데이터:', res.data);
      setResult(res.data);
      setLoading(false);
    } catch {
      alert("인증에 실패했습니다.");
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImage(file);
    setPreviewUrl(URL.createObjectURL(file));
    analyzeImage(file);
  };

  const handleRetry = () => {
    setImage(null);
    setPreviewUrl("");
    setResult(null);
  };

  return (
    <div className={styles.pageWrapper}>
      <CertTitle highlight="도락도락" />
      {info && <DosirakInfo info={info} />}
      {!image && <ImageUploadBox onChange={handleChange} />}
      <p className={styles.notice}>
        ※ 위에서 촬영한 사진을 첨부해주세요!
        <br />도시락 잔량은 10% 이하여야 합니다.
      </p> 
      {loading && <div className={styles.pageWrapper}><Spinner text="이미지 분석 중" /></div>}
      {previewUrl && <PreviewImage url={previewUrl} />}
      {result && (
        <>
          <GaugeBar percentage={result.remainPercentage} />
          <ResultMessage result={result} onRetry={handleRetry} />
        </>
      )}
    </div>
  );
};

export default ZeroWasteCertPage;