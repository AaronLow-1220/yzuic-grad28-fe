import { useCallback, useState, useEffect } from "react";
import { ImageSkeleton } from "../../ImageSkeleton";

export const Card = ({
  img, // 卡片圖片來源
  imageLoading, // 圖片是否正在加載
  title, // 卡片標題
  content, // 卡片內容摘要
  secondTitle, // 卡片副標題
  selectedFilter, // 當前選擇的過濾類別
  detailedContent, // 詳細內容（用於展開顯示）
  member, // 成員資訊
  teachers, // 指導老師資訊
  media, // 媒體信息
  onClick, // 點擊卡片時的回調函數
}) => {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [hasRound, setHasRound] = useState(false);

  // 處理圖片加載完成事件
  const handleImageLoad = () => {
    setImgLoaded(true);
  };

  // 處理卡片點擊事件，將卡片資料傳遞給父組件
  const handleCardClick = useCallback(() => {
    if (onClick) {
      onClick({
        img,
        title,
        content,
        secondTitle,
        detailedContent,
        member,
        teachers,
        media,
      }); // 傳遞資料給父元件
    }
  }, [
    onClick,
    img,
    title,
    content,
    secondTitle,
    detailedContent,
    member,
    teachers,
    media,
  ]);

  useEffect(() => {
    const updateRound = () => {
      setHasRound(window.innerWidth < 580 && selectedFilter !== "全部");
    };

    updateRound();
    window.addEventListener("resize", updateRound);
    return () => window.removeEventListener("resize", updateRound);
  }, [selectedFilter]);

  // 根據標題字數決定字體大小
  const titleFontSize = title && title.length > 10 ? "24px" : "24px";

  return (
    <div
      className={`${selectedFilter === "全部"
          ? "w-[calc(100vw-40px)] max-w-[300px]"
          : "w-full"
        }
        shrink-0 snap-start bg-[#361014]  overflow-hidden rounded-[12px] cursor-pointer`}
      onClick={handleCardClick}
    >
      {/* 卡片容器，使用 flex 佈局 */}
      <div className="relative flex flex-col justify-center group">
        {/* 卡片圖片區域 */}
        <div className={`max-w-full relative aspect-[4/3] overflow-hidden ${hasRound ? "rounded-[8px]" : ""}`}>
          <ImageSkeleton />
          <img
            className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
            src={img}
            alt={title || "卡片圖片"}
            onLoad={handleImageLoad}
          />
        </div>

        {/* 卡片內容區域 */}
        <div className="card-content p-[18px_24px_48px_24px] flex flex-col flex-grow">
          {/* 卡片標題 - 根據字數動態調整字體大小 */}
          <div
            className="text-[#FFFFFF] leading-[1.3em] mb-[3px] font-bold"
            style={{ fontSize: titleFontSize, fontFamily: "B" }}
          >
            {title}
          </div>

          {/* 卡片副標題 - 固定 16px */}
          <div
            className="text-secondary-color mb-[6px]"
            style={{ fontSize: "16px" }}
          >
            {secondTitle}
          </div>

          {/* 卡片內容摘要 - 固定 15px */}
          <div
            className="card-content-summary text-white overflow-hidden flex-1 opacity-[72%]"
            style={{ fontSize: "15px" }}
          >
            {content}
          </div>
        </div>
      </div>
    </div>
  );
};
