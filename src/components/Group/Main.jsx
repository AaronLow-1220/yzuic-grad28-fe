import { useState, useEffect, useRef } from "react";
import { Card } from "./Card/Card";
import { FocusCard } from "./Card/FocusCard";
import { Nav } from "./Nav/Nav";

export const Group = ({ focus }) => {
  const [windowWidthTrue, setWindowWidthTrue] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState("全部");
  const [buttonVisibility, setButtonVisibility] = useState({});
  const [focusCard, setFocusCard] = useState(null);
  const [fade, setFade] = useState(false);

  const scrollRefs = useRef({});

  const updateButtonVisibility = (category) => {
    if (scrollRefs.current[category]) {
      const cardScroll = scrollRefs.current[category];
      const scrollLeft = cardScroll.scrollLeft;
      const scrollWidth = cardScroll.scrollWidth;
      const clientWidth = cardScroll.clientWidth;

      const minScrollThreshold = 315;

      setButtonVisibility((prev) => ({
        ...prev,
        [category]: {
          showLeftButton: scrollLeft > minScrollThreshold, // 當滾動距離超過 316 才顯示左側按鈕
          showRightButton:
            scrollWidth - clientWidth - scrollLeft > minScrollThreshold, // 當剩餘可滾動距離大於 316 才顯示右側按鈕
        },
      }));
    }
  };

  const scroll = (category, direction) => {
    if (scrollRefs.current[category]) {
      const cardScroll = scrollRefs.current[category];
      const cardWidth = cardScroll.querySelector(".cardItem")?.offsetWidth + 16;
      const scrollAmount = direction === "left" ? -cardWidth : cardWidth;

      cardScroll.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
      setTimeout(() => updateButtonVisibility(category), 300);
    }
  };

  const handleCardClick = (cardData) => {
    setFocusCard(cardData);
    focus(true);
    setFade(false); // 進入 focus 狀態時，初始為不透明（透明度 0）
  };

  useEffect(() => {
    if (focusCard) {
      // 延遲幾毫秒後觸發過渡效果
      const timer = setTimeout(() => {
        setFade(true);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [focusCard]);

  const handleCancelFocus = () => {
    setFade(false);
    setTimeout(() => {
      setFocusCard(null);
      focus(false);
    }, 500);
  };

  useEffect(() => {
    const initializeButtonVisibility = () => {
      Object.keys(scrollRefs.current).forEach((category) => {
        updateButtonVisibility(category);
      });
    };

    // 當畫面載入或篩選變更時執行
    setTimeout(initializeButtonVisibility, 100);

    window.addEventListener("resize", initializeButtonVisibility);
    return () =>
      window.removeEventListener("resize", initializeButtonVisibility);
  }, [selectedFilter]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        //手機
        setWindowWidthTrue(false);
      } else if (window.innerWidth < 1024) {
        //平板直立
        setWindowWidthTrue(true);
      } else if (window.innerWidth < 1584) {
        //平板
        setWindowWidthTrue(true);
      } else {
        //電腦
        setWindowWidthTrue(true);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 模擬的 Card 資料
  const cards = [
    {
      category: "互動",
      img: "/遊戲_web.png",
      title: "完了！！怎麼辦！！青春戀愛攻防戰",
      content:
        "融合台灣街頭叫賣聲與現代曲風，透過聲波視覺化與音樂創作，重現庶民謀生之旅。",
      secondTitle: "Timeout Studio",
      detailedContent:
        "在這個寬廣的世界中，探查那些未知的奧秘和探險世界上最危險未知現象的探險家們被稱為「StormSeeker」。 玩家將扮演其中一員，在探索過程中不得已進入一處廢棄神廟躲避災難，好奇心驅使下深入探索，發現神廟深處有一具扇子造型的寶物，靠近時不小心誤觸封印機關，跌入最深層，跌入後雖身處險境，但神器依舊被自己成功帶走，而這神器具有神力可讓使用者獲得操控風的能力，廢棄神廟充滿了機關與敵人，主角將一路解開機關，擊敗敵人逃出生天。在這個寬廣的世界中，探查那些未知的奧秘和探險世界上最危險未知現象的探險家們被稱為「StormSeeker」。 玩家將扮演其中一員，在探索過程中不得已進入一處廢棄神廟躲避災難，好奇心驅使下深入探索，發現神廟深處有一具扇子造型的寶物，靠近時不小心誤觸封印機關，跌入最深層，跌入後雖身處險境，但神器依舊被自己成功帶走，而這神器具有神力可讓使用者獲得操控風的能力，廢棄神廟充滿了機關與敵人，主角將一路解開機關，擊敗敵人逃出生天。在這個寬廣的世界中，探查那些未知的奧秘和探險世界上最危險未知現象的探險家們被稱為「StormSeeker」。 玩家將扮演其中一員，在探索過程中不得已進入一處廢棄神廟躲避災難，好奇心驅使下深入探索，發現神廟深處有一具扇子造型的寶物，靠近時不小心誤觸封印機關，跌入最深層，跌入後雖身處險境，但神器依舊被自己成功帶走，而這神器具有神力可讓使用者獲得操控風的能力，廢棄神廟充滿了機關與敵人，主角將一路解開機關，擊敗敵人逃出生天。",
      member: ["陳嘉鴻", "張鈞", "張銘", "張銘", "張銘"],
      teachers: ["張銘", "張銘", "張銘"],
    },
    {
      category: "互動",
      img: "",
      title: "完了！！怎麼辦！！青春戀愛攻防戰",
      content:
        "融合台灣街頭叫賣聲與現代曲風，透過聲波視覺化與音樂創作，重現庶民謀生之旅。",
      secondTitle: "Timeout Studio",
      detailedContent:
        "在這個寬廣的世界中，探查那些未知的奧秘和探險世界上最危險未知現象的探險家們被稱為「StormSeeker」。 玩家將扮演其中一員，在探索過程中不得已進入一處廢棄神廟躲避災難，好奇心驅使下深入探索，發現神廟深處有一具扇子造型的寶物，靠近時不小心誤觸封印機關，跌入最深層，跌入後雖身處險境，但神器依舊被自己成功帶走，而這神器具有神力可讓使用者獲得操控風的能力，廢棄神廟充滿了機關與敵人，主角將一路解開機關，擊敗敵人逃出生天。",
      member: ["陳嘉鴻", "張鈞", "張銘", "張銘", "張銘"],
      teachers: ["張銘", "張銘", "張銘"],
    },
    {
      category: "互動",
      img: "",
      title: "完了！！怎麼辦！！青春戀愛攻防戰",
      content:
        "融合台灣街頭叫賣聲與現代曲風，透過聲波視覺化與音樂創作，重現庶民謀生之旅。",
      secondTitle: "Timeout Studio",
      detailedContent:
        "在這個寬廣的世界中，探查那些未知的奧秘和探險世界上最危險未知現象的探險家們被稱為「StormSeeker」。 玩家將扮演其中一員，在探索過程中不得已進入一處廢棄神廟躲避災難，好奇心驅使下深入探索，發現神廟深處有一具扇子造型的寶物，靠近時不小心誤觸封印機關，跌入最深層，跌入後雖身處險境，但神器依舊被自己成功帶走，而這神器具有神力可讓使用者獲得操控風的能力，廢棄神廟充滿了機關與敵人，主角將一路解開機關，擊敗敵人逃出生天。",
      member: ["陳嘉鴻", "張鈞", "張銘", "張銘", "張銘"],
      teachers: ["張銘", "張銘", "張銘"],
    },
    {
      category: "互動",
      img: "",
      title: "完了！！怎麼辦！！青春戀愛攻防戰",
      content:
        "融合台灣街頭叫賣聲與現代曲風，透過聲波視覺化與音樂創作，重現庶民謀生之旅。",
      secondTitle: "Timeout Studio",
      detailedContent:
        "在這個寬廣的世界中，探查那些未知的奧秘和探險世界上最危險未知現象的探險家們被稱為「StormSeeker」。 玩家將扮演其中一員，在探索過程中不得已進入一處廢棄神廟躲避災難，好奇心驅使下深入探索，發現神廟深處有一具扇子造型的寶物，靠近時不小心誤觸封印機關，跌入最深層，跌入後雖身處險境，但神器依舊被自己成功帶走，而這神器具有神力可讓使用者獲得操控風的能力，廢棄神廟充滿了機關與敵人，主角將一路解開機關，擊敗敵人逃出生天。",
      member: ["陳嘉鴻", "張鈞", "張銘", "張銘", "張銘"],
      teachers: ["張銘", "張銘", "張銘"],
    },
    {
      category: "行銷",
      img: "",
      title: "行銷策略大揭秘",
      content: "探討最新的數位行銷策略，如何吸引目標受眾，創造品牌影響力。",
      secondTitle: "Marketing Pro",
      detailedContent:
        "在這個寬廣的世界中，探查那些未知的奧秘和探險世界上最危險未知現象的探險家們被稱為「StormSeeker」。 玩家將扮演其中一員，在探索過程中不得已進入一處廢棄神廟躲避災難，好奇心驅使下深入探索，發現神廟深處有一具扇子造型的寶物，靠近時不小心誤觸封印機關，跌入最深層，跌入後雖身處險境，但神器依舊被自己成功帶走，而這神器具有神力可讓使用者獲得操控風的能力，廢棄神廟充滿了機關與敵人，主角將一路解開機關，擊敗敵人逃出生天。",
      member: ["陳嘉鴻", "張鈞", "張銘", "張銘", "張銘"],
      teachers: ["張銘", "張銘", "張銘"],
    },
    {
      category: "互動",
      img: "/影視_web.png",
      title: "完了！！怎麼辦！！青春戀愛攻防戰",
      content:
        "融合台灣街頭叫賣聲與現代曲風，透過聲波視覺化與音樂創作，重現庶民謀生之旅。",
      secondTitle: "Timeout Studio",
      detailedContent:
        "在這個寬廣的世界中，探查那些未知的奧秘和探險世界上最危險未知現象的探險家們被稱為「StormSeeker」。 玩家將扮演其中一員，在探索過程中不得已進入一處廢棄神廟躲避災難，好奇心驅使下深入探索，發現神廟深處有一具扇子造型的寶物，靠近時不小心誤觸封印機關，跌入最深層，跌入後雖身處險境，但神器依舊被自己成功帶走，而這神器具有神力可讓使用者獲得操控風的能力，廢棄神廟充滿了機關與敵人，主角將一路解開機關，擊敗敵人逃出生天。",
      member: ["陳嘉鴻", "張鈞", "張銘", "張銘", "張銘"],
      teachers: ["張銘", "張銘", "張銘"],
    },
    {
      category: "互動",
      img: "",
      title: "完了！！怎麼辦！！青春戀愛攻防戰",
      content:
        "融合台灣街頭叫賣聲與現代曲風，透過聲波視覺化與音樂創作，重現庶民謀生之旅。",
      secondTitle: "Timeout Studio",
      detailedContent:
        "在這個寬廣的世界中，探查那些未知的奧秘和探險世界上最危險未知現象的探險家們被稱為「StormSeeker」。 玩家將扮演其中一員，在探索過程中不得已進入一處廢棄神廟躲避災難，好奇心驅使下深入探索，發現神廟深處有一具扇子造型的寶物，靠近時不小心誤觸封印機關，跌入最深層，跌入後雖身處險境，但神器依舊被自己成功帶走，而這神器具有神力可讓使用者獲得操控風的能力，廢棄神廟充滿了機關與敵人，主角將一路解開機關，擊敗敵人逃出生天。",
      member: ["陳嘉鴻", "張鈞", "張銘", "張銘", "張銘"],
      teachers: ["張銘", "張銘", "張銘"],
    },
    {
      category: "互動",
      img: "",
      title: "完了！！怎麼辦！！青春戀愛攻防戰",
      content:
        "融合台灣街頭叫賣聲與現代曲風，透過聲波視覺化與音樂創作，重現庶民謀生之旅。",
      secondTitle: "Timeout Studio",
      detailedContent:
        "在這個寬廣的世界中，探查那些未知的奧秘和探險世界上最危險未知現象的探險家們被稱為「StormSeeker」。 玩家將扮演其中一員，在探索過程中不得已進入一處廢棄神廟躲避災難，好奇心驅使下深入探索，發現神廟深處有一具扇子造型的寶物，靠近時不小心誤觸封印機關，跌入最深層，跌入後雖身處險境，但神器依舊被自己成功帶走，而這神器具有神力可讓使用者獲得操控風的能力，廢棄神廟充滿了機關與敵人，主角將一路解開機關，擊敗敵人逃出生天。",
      member: ["陳嘉鴻", "張鈞", "張銘", "張銘", "張銘"],
      teachers: ["張銘", "張銘", "張銘"],
    },
  ];

  const filteredCategories = [...new Set(cards.map((card) => card.category))];
  const filteredCards =
    selectedFilter === "全部"
      ? cards
      : cards.filter((card) => card.category === selectedFilter);

  return windowWidthTrue ? (
    <>
      {focusCard ? (
        <>
          <div
            className="mt-[2rem] opacity-[50%] fixed inset-0"
            style={{
              zIndex: -1,
              pointerEvents: "none",
            }}
          >
            <Nav onFilterChange={setSelectedFilter} />
            {selectedFilter != "全部" ? (
              <div className="flex justify-center">
                <div
                  className={
                    window.innerWidth < 1024
                      ? "grid grid-cols-2 gap-4 mt-[2.5rem] px-[1rem]"
                      : window.innerWidth < 1536
                      ? "grid grid-cols-3 gap-4  px-[1rem]"
                      : "grid grid-cols-4 gap-4  px-[1rem]"
                  }
                >
                  {filteredCards.map((card, index) => (
                    <Card
                      TitleFontSize={setWindowWidthTrue ? "20px" : "1rem"}
                      secondTitleFontSize={setWindowWidthTrue ? "16px" : "14px"}
                      ContentFontSize={setWindowWidthTrue ? "15px" : "0px"}
                      key={index}
                      img={card.img}
                      title={card.title}
                      content={card.content}
                      secondTitle={card.secondTitle}
                      detailedContent={card.detailedContent}
                      member={card.member}
                      teachers={card.teachers}
                      onClick={handleCardClick}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <div>
                {filteredCategories.map((item, index) => (
                  <div className="relative" key={index}>
                    {buttonVisibility[item]?.showLeftButton && (
                      <div
                        className={`absolute arrowPositionLeft -translate-y-1/2 w-[56px] h-[56px] rounded-[28px] bg-[#6C2028] flex items-center justify-center z-10 cursor-pointer hover:bg-[#D84050] transition-all duration-1000 ease-in-out`}
                        style={{ top: "calc(50% + 30px)", left: "220px" }}
                        onClick={() => scroll(item, "left")}
                      >
                        <img
                          style={{
                            width: "24px",
                            height: "24px",
                            transform: "rotate(180deg)",
                          }}
                          src="/arrow_forward_ios.svg"
                          alt=""
                        />
                      </div>
                    )}

                    <div
                      className={
                        window.innerWidth < 1024
                          ? "flex mt-[2.5rem] px-[20px]"
                          : window.innerWidth < 1536
                          ? "flex  px-[128px]"
                          : "flex  px-[256px]"
                      }
                    >
                      <div
                        className="text-[28px] text-white  pe-[0.5rem] pb-[0.1rem]"
                        style={{ fontFamily: "B" }}
                        onClick={() => setSelectedFilter(item)}
                      >
                        {item}
                      </div>
                      <img src="/arrow_forward_ios.svg" alt="" />
                    </div>
                    <div
                      ref={(el) => (scrollRefs.current[item] = el)}
                      onScroll={() => updateButtonVisibility(item)}
                      className="cardScroll"
                    >
                      {filteredCards
                        .filter((card) => card.category === item)
                        .map((card, index) => (
                          <div key={index} className="cardItem">
                            <Card
                              TitleFontSize="20px"
                              secondTitleFontSize="1rem"
                              ContentFontSize="15px"
                              img={card.img}
                              title={card.title}
                              content={card.content}
                              secondTitle={card.secondTitle}
                              selectedFilter={selectedFilter}
                              detailedContent={card.detailedContent}
                              member={card.member}
                              teachers={card.teachers}
                              onClick={handleCardClick}
                            />
                          </div>
                        ))}
                    </div>

                    {buttonVisibility[item]?.showRightButton && (
                      <div
                        className="absolute  arrowPositionRight -translate-y-1/2 w-[56px] h-[56px] rounded-[28px] bg-[#6C2028] flex items-center justify-center z-10 cursor-pointer hover:bg-[#D84050] transition-all duration-1000 ease-in-out"
                        style={{ top: "calc(50% + 30px)", right: "220px" }}
                        onClick={() => scroll(item, "right")}
                      >
                        <img
                          style={{
                            width: "24px",
                            height: "24px",
                          }}
                          src="/arrow_forward_ios.svg"
                          alt=""
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div
            className={`absolute top-[100px] left-0 right-0 px-[40px] z-[1000] transform transition-all duration-500 ease-in-out ${
              fade ? "translate-y-0" : "translate-y-[100%]"
            }`}
          >
            <FocusCard
              {...focusCard}
              TitleFontSize="48px"
              secondTitleFontSize="16px"
              ContentFontSize="14px"
              onClick={handleCancelFocus}
            ></FocusCard>
          </div>
        </>
      ) : (
        <div className="mt-[5rem]">
          <Nav onFilterChange={setSelectedFilter} />
          {selectedFilter != "全部" ? (
            <div className="flex justify-center">
              <div
                className={
                  window.innerWidth < 1024
                    ? "grid grid-cols-2 gap-4 mt-[2.5rem] px-[1rem]"
                    : window.innerWidth < 1536
                    ? "grid grid-cols-3 gap-4  px-[1rem]"
                    : "grid grid-cols-4 gap-4  px-[1rem]"
                }
              >
                {filteredCards.map((card, index) => (
                  <Card
                    TitleFontSize={setWindowWidthTrue ? "20px" : "1rem"}
                    secondTitleFontSize={setWindowWidthTrue ? "16px" : "14px"}
                    ContentFontSize={setWindowWidthTrue ? "15px" : "0px"}
                    key={index}
                    img={card.img}
                    title={card.title}
                    content={card.content}
                    secondTitle={card.secondTitle}
                    detailedContent={card.detailedContent}
                    member={card.member}
                    teachers={card.teachers}
                    onClick={handleCardClick}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div>
              {filteredCategories.map((item, index) => (
                <div className="relative" key={index}>
                  {buttonVisibility[item]?.showLeftButton && (
                    <div
                      className={`absolute arrowPositionLeft -translate-y-1/2 w-[56px] h-[56px] rounded-[28px] bg-[#6C2028] flex items-center justify-center z-10 cursor-pointer hover:bg-[#D84050] transition-all duration-1000 ease-in-out`}
                      style={{ top: "calc(50% + 30px)", left: "220px" }}
                      onClick={() => scroll(item, "left")}
                    >
                      <img
                        style={{
                          width: "24px",
                          height: "24px",
                          transform: "rotate(180deg)",
                        }}
                        src="/arrow_forward_ios.svg"
                        alt=""
                      />
                    </div>
                  )}

                  <div
                    className={
                      window.innerWidth < 1024
                        ? "flex mt-[2.5rem] px-[20px]"
                        : window.innerWidth < 1536
                        ? "flex  px-[128px]"
                        : "flex  px-[256px]"
                    }
                  >
                    <div
                      className="text-[28px] text-white  pe-[8px] leading-none"
                      style={{ fontFamily: "B" }}
                      onClick={() => setSelectedFilter(item)}
                    >
                      {item}
                    </div>
                    <img src="/arrow_forward_ios.svg" alt="" />
                  </div>
                  <div
                    ref={(el) => (scrollRefs.current[item] = el)}
                    onScroll={() => updateButtonVisibility(item)}
                    className="cardScroll"
                  >
                    {filteredCards
                      .filter((card) => card.category === item)
                      .map((card, index) => (
                        <div key={index} className="cardItem">
                          <Card
                            TitleFontSize="20px"
                            secondTitleFontSize="1rem"
                            ContentFontSize="15px"
                            img={card.img}
                            title={card.title}
                            content={card.content}
                            secondTitle={card.secondTitle}
                            selectedFilter={selectedFilter}
                            detailedContent={card.detailedContent}
                            member={card.member}
                            teachers={card.teachers}
                            onClick={handleCardClick}
                          />
                        </div>
                      ))}
                  </div>

                  {buttonVisibility[item]?.showRightButton && (
                    <div
                      className="absolute  arrowPositionRight -translate-y-1/2 w-[56px] h-[56px] rounded-[28px] bg-[#6C2028] flex items-center justify-center z-10 cursor-pointer hover:bg-[#D84050] transition-all duration-1000 ease-in-out"
                      style={{ top: "calc(50% + 30px)", right: "220px" }}
                      onClick={() => scroll(item, "right")}
                    >
                      <img
                        style={{
                          width: "24px",
                          height: "24px",
                        }}
                        src="/arrow_forward_ios.svg"
                        alt=""
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  ) : (
    <>
      {focusCard ? (
        <>
          <div
            className="mt-[3rem] opacity-[50%] fixed inset-0"
            style={{
              zIndex: -1,
              pointerEvents: "none",
            }}
          >
            <Nav onFilterChange={setSelectedFilter} />
            {selectedFilter != "全部" ? (
              <>
                <div className="grid grid-cols-2 gap-4 mt-[2.5rem] px-[20px]">
                  {filteredCards.map((card, index) => (
                    <Card
                      TitleFontSize="1rem"
                      secondTitleFontSize="14px"
                      ContentFontSize="0px"
                      key={index}
                      img={card.img}
                      title={card.title}
                      content={card.content}
                      secondTitle={card.secondTitle}
                      detailedContent={card.detailedContent}
                      member={card.member}
                      teachers={card.teachers}
                      onClick={handleCardClick}
                    />
                  ))}
                </div>
              </>
            ) : (
              <>
                {filteredCategories.map((item, index) => (
                  <div key={index}>
                    <div className="flex mt-[2.5rem]  px-[20px]">
                      <div
                        className="text-[28px] text-white pe-[8px] leading-none"
                        style={{ fontFamily: "B" }}
                        onClick={() => setSelectedFilter(item)}
                      >
                        {item}
                      </div>
                      <img src="/arrow_forward_ios.svg" alt="" />
                    </div>
                    <div className="cardScroll">
                      {filteredCards
                        .filter((card) => card.category === item)
                        .map((card, index) => (
                          <Card
                            TitleFontSize="20px"
                            secondTitleFontSize="1rem"
                            ContentFontSize="15px"
                            key={index}
                            img={card.img}
                            title={card.title}
                            content={card.content}
                            secondTitle={card.secondTitle}
                            selectedFilter={selectedFilter}
                            detailedContent={card.detailedContent}
                            member={card.member}
                            teachers={card.teachers}
                            onClick={handleCardClick}
                          />
                        ))}
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
          <div
            className={`absolute top-[50px] left-0 right-0 px-[20px] z-[1000] transition-opacity duration-500 ${
              fade ? "opacity-100" : "opacity-0"
            }`}
          >
            <FocusCard
              {...focusCard}
              TitleFontSize="2rem"
              secondTitleFontSize="24px"
              ContentFontSize="20px"
              onClick={handleCancelFocus}
            ></FocusCard>
          </div>
        </>
      ) : (
        <div className="mt-[5rem]">
          <Nav onFilterChange={setSelectedFilter} />
          {selectedFilter != "全部" ? (
            <>
              <div className="grid grid-cols-2 gap-4 mt-[2.5rem] px-[20px]">
                {filteredCards.map((card, index) => (
                  <Card
                    TitleFontSize="1rem"
                    secondTitleFontSize="14px"
                    ContentFontSize="0px"
                    key={index}
                    img={card.img}
                    title={card.title}
                    content={card.content}
                    secondTitle={card.secondTitle}
                    detailedContent={card.detailedContent}
                    member={card.member}
                    teachers={card.teachers}
                    onClick={handleCardClick}
                  />
                ))}
              </div>
            </>
          ) : (
            <>
              {filteredCategories.map((item, index) => (
                <div key={index}>
                  <div className="flex  px-[20px]">
                    <div
                      className="text-[28px] text-white pe-[8px] leading-none"
                      style={{ fontFamily: "B" }}
                      onClick={() => setSelectedFilter(item)}
                    >
                      {item}
                    </div>
                    <img src="/arrow_forward_ios.svg" alt="" />
                  </div>
                  <div className="cardScroll">
                    {filteredCards
                      .filter((card) => card.category === item)
                      .map((card, index) => (
                        <Card
                          TitleFontSize="20px"
                          secondTitleFontSize="1rem"
                          ContentFontSize="15px"
                          key={index}
                          img={card.img}
                          title={card.title}
                          content={card.content}
                          secondTitle={card.secondTitle}
                          selectedFilter={selectedFilter}
                          detailedContent={card.detailedContent}
                          member={card.member}
                          teachers={card.teachers}
                          onClick={handleCardClick}
                        />
                      ))}
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      )}
    </>
  );
};
