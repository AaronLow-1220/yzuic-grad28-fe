import { useState, useEffect } from "react";
import { Model } from "./components/MainVision/Model";
import { Logo } from "./components/MainVision/Logo";
import { Slogan } from "./components/IntroduceComponents/Slogan";
import { IpModel } from "./components/IntroduceComponents/IpModel";
import { DateMap } from "./components/DateMapComponents/DateMap";
import { Unit } from "./components/UnitComponents/Unit";

function App() {
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [unitWindowHeight, setUnitWindowHeight] = useState("68rem");
  const [windowTrue, setWindowTrue] = useState(false);
  const [windowDesktop, setWindowDesktop] = useState(false);
  const [marginBottom, setMarginBottom] = useState("3rem");

  // Logo 動畫觸發方法
  const handleLogoAnimation = () => {
    doAnimation();
  };
  const doAnimation = () => {
    setAnimate(true);
  };
  // 處理動畫結束回調
  const handleAnimationEnd = () => {
    setIsAnimationComplete(true);
  };
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setUnitWindowHeight("68rem");
        setWindowTrue(false);
        setMarginBottom("3rem");
      } else if (window.innerWidth < 1024) {
        setUnitWindowHeight("55.25rem");
        setWindowTrue(true);
        setMarginBottom("6rem");
      } else {
        setUnitWindowHeight("52rem");
        setWindowTrue(true);
        setWindowDesktop(true);
        setMarginBottom("8rem");
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!isAnimationComplete) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isAnimationComplete]);

  return (
    <div className="">
      <div>
        <div className="bg-pink-radial">
          <div className="w-full h-full relative flex justify-center items-center">
            <img
              style={{ maxWidth: "initial" }}
              className="h-full"
              src="/Background_web.jpg"
              alt=""
            />
          </div>
        </div>
        <Logo beginAnimation={animate} />
        <Model
          onAnimationEnd={handleAnimationEnd} // 傳遞動畫結束回調
          logoAnimation={handleLogoAnimation} // 傳遞 Logo 動畫觸發方法
        />
      </div>
      <div className="w-full " style={{ marginBottom: marginBottom }}>
        <Slogan title="創意滿腦永不衰" secondTitle="左手畫圖，右手寫code" />
        {windowTrue ? (
          windowDesktop ? (
            <div className="mt-[5.375rem] ">
              <div className="max-w-[83rem] mx-auto flex justify-between ">
                <IpModel
                  title="互動"
                  secondTitle="Digital Experience"
                  img="/互動_web.png"
                />
                <IpModel
                  title="遊戲"
                  secondTitle="Game Design"
                  img="/遊戲_web.png"
                />
                <IpModel
                  title="影視"
                  secondTitle="Film Production"
                  img="/影視_web.png"
                />
                <IpModel
                  title="行銷"
                  secondTitle="Marketing"
                  img="/行銷_web.png"
                />
                <IpModel
                  title="動畫"
                  secondTitle="Animation"
                  img="/動畫_web.png"
                />
              </div>
            </div>
          ) : (
            <div className="ipModelScroll">
              <IpModel
                title="互動"
                secondTitle="Digital Experience"
                img="/互動_web.png"
              />
              <IpModel
                title="遊戲"
                secondTitle="Game Design"
                img="/遊戲_web.png"
              />
              <IpModel
                title="影視"
                secondTitle="Film Production"
                img="/影視_web.png"
              />
              <IpModel
                title="行銷"
                secondTitle="Marketing"
                img="/行銷_web.png"
              />
              <IpModel
                title="動畫"
                secondTitle="Animation"
                img="/動畫_web.png"
              />
            </div>
          )
        ) : (
          <div className="max-w-[33.75rem] h-[49.4rem] mt-[2.6rem] mx-auto">
            <IpModel
              height="8.75rem"
              title="互動"
              secondTitle="Digital Experience"
              img="/互動_web.png"
              imgWidth="9.5rem"
              rowReverse="true"
            />
            <IpModel
              height="6.5rem"
              title="遊戲"
              secondTitle="Game Design"
              img="/遊戲_web.png"
              imgWidth="7.625rem"
            />
            <IpModel
              height="10rem"
              title="影視"
              secondTitle="Film Production"
              img="/影視_web.png"
              imgWidth="7.5rem"
              rowReverse="true"
              textMarginLeft="12px"
            />
            <IpModel
              height="8.25rem"
              title="行銷"
              secondTitle="Marketing"
              img="/行銷_web.png"
              imgWidth="9.3rem"
            />
            <IpModel
              height="7.75rem"
              title="動畫"
              secondTitle="Animation"
              img="/動畫_web.png"
              imgWidth="10.25rem"
              rowReverse="true"
              textMarginLeft="12px"
            />
          </div>
        )}
      </div>
      <div className="w-full h-[75.5rem]">
        <Slogan title="跨域築夢不徘徊" secondTitle="提案練習日日在" />
        {windowTrue === true ? (
          <>
            <div className="wave-container ">
              <div className="img-container wave_0">
                <img src="/wave_0.webp" alt="" className="wave" />
                <img src="/wave_0.webp" alt="" className="wave" />
              </div>
              <div className="img-container wave_1">
                <img src="/wave_1.webp" alt="" className="wave" />
                <img src="/wave_1.webp" alt="" className="wave" />
              </div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <DateMap
                  backgroundColor="#FFFFFF"
                  color="#E04AA9"
                  title="校內展"
                  date="04.07"
                  secondDate="04.11"
                  place="元智大學•五館三樓 / 六館玻璃屋"
                />
              </div>
            </div>
            <div className="wave-container absolute left-1/2 transform -translate-x-1/2 -translate-y-[30%]">
              <div className="img-container wave_2">
                <img src="/wave_2.webp" alt="" className="wave" />
                <img src="/wave_2.webp" alt="" className="wave" />
              </div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                <DateMap
                  backgroundColor="#E04AA9"
                  color="#FFFFFF"
                  title="校外展"
                  date="04.25"
                  secondDate="04.28"
                  place="松三文創園區• 三號倉庫"
                  reverseRow="true"
                />
              </div>
            </div>
            <div
              className="wave-container absolute z-0"
              style={{
                height: "230px",
                transform: " translateY(-155%)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div className="img-container wave_3" style={{ position: "relative" }}>
                <img src="/wave_3.webp" alt="" className="wave" />
                <img src="/wave_3.webp" alt="" className="wave" />
              </div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
            </div>
          </>
        ) : (
          <>
            <div className="wave-container absolute left-1/2 transform -translate-x-1/2">
              <div className="img-container wave_0">
                <img src="/wave_0.webp" alt="" className="wave" />
                <img src="/wave_0.webp" alt="" className="wave" />
              </div>
              <div className="img-container wave_1">
                <img src="/wave_1.webp" alt="" className="wave" />
                <img src="/wave_1.webp" alt="" className="wave" />
              </div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <DateMap
                  backgroundColor="#FFFFFF"
                  color="#E04AA9"
                  title="校內展"
                  date="04.07"
                  secondDate="04.11"
                  place="元智大學•五館三樓 / 六館玻璃屋"
                />
              </div>
            </div>
            <div className="wave-container absolute left-1/2 transform -translate-x-1/2 -translate-y-[27%]">
              <div className="img-container wave_2">
                <img src="/wave_2.webp" alt="" className="wave" />
                <img src="/wave_2.webp" alt="" className="wave" />
              </div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                <DateMap
                  backgroundColor="#FFFFFF"
                  color="#E04AA9"
                  title="校內展"
                  date="04.07"
                  secondDate="04.11"
                  place="元智大學•五館三樓 / 六館玻璃屋"
                />
              </div>
            </div>
            <div
              className="wave-container absolute z-0"
              style={{
                height: "200px",
                transform: " translateY(-190%)",
                background:
                  "linear-gradient(to bottom, rgba(0, 0, 0, 0) 5%, rgba(0, 0, 0, 1) 100%)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div className="img-container wave_3" style={{ position: "relative" }}>
                <img src="/wave_3.webp" alt="" className="wave" />
                <img src="/wave_3.webp" alt="" className="wave" />
              </div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
            </div>
          </>
        )}
      </div>
      <div
        className="w-full  mt-[7.125rem]"
        style={{ height: unitWindowHeight }}
      >
        <Slogan title="草莓派，有夠π～" secondTitle="記住我們的名字" />
        {windowTrue === true ? (
          windowDesktop ? (
            <>
              <div className="w-[35.25rem] flex justify-between mx-auto">
                <Unit
                  title="主辦單位"
                  img="/元智大學資訊傳播學系.svg"
                  imgWidth="15.625rem"
                />
                <Unit
                  title="執行單位"
                  img="/第28屆畢業展覽籌備會.svg"
                  imgWidth="15.625rem"
                />
              </div>
              <Unit
                title="贊助單位"
                img="/華視文教基金會.png"
                img2="/教育部高等深耕教育計劃.png"
                imgWidth="15.625rem"
              />
              <Unit
                title="指導單位"
                img="/桃園市政府.svg"
                img2="/桃園市政府青年事務局.png"
                img3="/桃園市議會.svg"
                img4="/元智大學-資訊學院.svg"
                imgWidth="15.625rem"
              />
            </>
          ) : (
            <>
              <div className="w-[35.25rem] flex justify-between mx-auto">
                <Unit
                  title="主辦單位"
                  img="/元智大學資訊傳播學系.svg"
                  imgWidth="15.625rem"
                />
                <Unit
                  title="執行單位"
                  img="/第28屆畢業展覽籌備會.svg"
                  imgWidth="15.625rem"
                />
              </div>
              <Unit
                title="贊助單位"
                img="/華視文教基金會.png"
                img2="/教育部高等深耕教育計劃.png"
                imgWidth="15.625rem"
              />
              <Unit
                title="指導單位"
                img="/桃園市政府.svg"
                img2="/桃園市政府青年事務局.png"
                img3="/桃園市議會.svg"
                img4="/元智大學-資訊學院.svg"
                imgWidth="15.625rem"
              />
            </>
          )
        ) : (
          <>
            <Unit title="主辦單位" img="/元智大學資訊傳播學系.svg" />
            <Unit title="執行單位" img="/第28屆畢業展覽籌備會.svg" />
            <Unit
              title="贊助單位"
              img="/教育部高等深耕教育計劃_mobile.png"
              img2="/華視文教基金會_mobile.png"
            />
            <Unit
              title="指導單位"
              img="/桃園市政府.svg"
              img2="/桃園市政府青年事務局.png"
              img3="/桃園市議會.svg"
              img4="/元智大學-資訊學院.svg"
            />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
