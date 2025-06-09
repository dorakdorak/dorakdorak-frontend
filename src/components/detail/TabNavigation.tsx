import styles from "@/css/detail/Tabs.module.css";

const TabNavigation = () => {
  const handleScroll = (targetId: string) => {
    const section = document.getElementById(targetId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className={styles.tabs}>
      <button className={styles.tabButton} onClick={() => handleScroll("info")}>
        상세 정보
      </button>
      <button className={styles.tabButton} onClick={() => handleScroll("nutrition")}>
        영양 정보
      </button>
    </div>
  );
};

export default TabNavigation;
