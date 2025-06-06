import "@/css/detail/tabs.css";

const TabNavigation = () => {
  const handleScroll = (targetId: string) => {
    const section = document.getElementById(targetId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="tabs">
      <button onClick={() => handleScroll("info")}>상세 정보</button>
      <button onClick={() => handleScroll("nutrition")}>영양 정보</button>
    </div>
  );
};

export default TabNavigation;
