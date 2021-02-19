import React, { useState, useEffect, useRef } from 'react'
import 'antd/dist/antd.css';
import Nav from '../../component/Nav/index';
// import SongListRecommend from '../../component/SongListRecommend/index';
import axios from 'axios';
// eslint-disable-next-line
import { Card, Row, Col, Progress } from 'antd';
import { LeftCircleOutlined, RightCircleOutlined, PlayCircleOutlined, PauseCircleOutlined } from '@ant-design/icons';

// const { Meta } = Card;

const Home = () => {

  const [songList, setSongList] = useState([]);
  // eslint-disable-next-line
  const [playStatus, setPlayStatus] = useState(false); // 播放状态， true 播放中， false 暂停中
  // eslint-disable-next-line
  const [isCanPlay, setIsCanPlay] = useState(false);   // 判断音频是否加载完成
  // eslint-disable-next-line
  const [duration, setDuration] = useState('00:00');    // 音频的时长
  // eslint-disable-next-line
  const [playNowTime, setPlayNowTime] = useState('00:00');  // 当前的播放时间

  const [percent, setPercent] = useState(0);

  const music = useRef(null);
  const playIcon = useRef(null);
  const pauseIcon = useRef(null);
  const playBar = useRef(null);
  const playLine = useRef(null);
  const playSlider = useRef(null);
  const playDot = useRef(null);

  useEffect(() => {
    getSongList();
  }, []);

  const getSongList = () => {
    axios.get('http://localhost:3000/personalized', {
      limit: 1
    })
      .then((res) => {
        console.log(res);
        let list = res.data.result.slice(0, 8);
        setSongList(list);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const playMusic = (e) => {
    setPlayStatus(true);
    music.current.play();
    playIcon.current.style.display = 'none';
    pauseIcon.current.style.display = '';
    // 播放的时候计算时长
    let dura = transTime(Math.floor(music.current.duration));
    setDuration(dura);
    // console.log("歌曲时长", dura);

    music.current.addEventListener('timeupdate', updateProgress, false);

    music.current.onended = () => {
      // console.log("测试");
      alert("测试");
    }

  }

  const pauseMusic = () => {
    setPlayStatus(false);
    playIcon.current.style.display = '';
    pauseIcon.current.style.display = 'none';
    music.current.pause();
  }


  const updateProgress = () => {
    let value = music.current.currentTime / music.current.duration;
    console.log("时间", value);
    playSlider.current.style.width = value * 100 + '%';
    playDot.current.style.marginLeft = value * 100 + '%';
    setPlayNowTime(transTime(music.current.currentTime));
  }


  // 计算时长
  const transTime = (time) => {
    let duration = parseInt(time, 10);
    let minute = parseInt(duration / 60, 10);
    let sec = duration % 60 + '';
    let isM0 = ':';
    if (minute === 0) {
      minute = '00';
    } else if (minute < 10) {
      minute = '0' + minute;
    }
    if (sec.length === 1) {
      sec = '0' + sec;
    }
    return minute + isM0 + sec;
  }






  return (
    <>
      <Nav />

      <div style={{ width: "50%", display: "flex", justifyContent: 'center', alignItems: 'center', margin: "20px auto", minWidth: "960px" }}>
        <div style={{ width: '75%', border: "1px solid black", height: '1400px' }}>
          <div style={{ borderBottom: "3px solid #C10D0C", marginLeft: "10px", display: "flex", justifyContent: "start", alignItems: "center", height: "35px" }}>
            <h3 style={{ paddingLeft: "45px", fontSize: "20px", color: "#333333", marginBottom: "5px" }}>热门推荐</h3>
            <div style={{ lineHeight: "35px", marginLeft: "20px" }}>
              <a href="/discover/playlist/?cat=%E5%8D%8E%E8%AF%AD" style={{ padding: "0px 10px", fontSize: "12px", color: "#666666" }}>华语</a>
              <a href="/discover/playlist/?cat=%E6%B5%81%E8%A1%8C" style={{ padding: "0px 10px", fontSize: "12px", color: "#666666" }}>流行</a>
              <a href="/discover/playlist/?cat=%E6%91%87%E6%BB%9A" style={{ padding: "0px 10px", fontSize: "12px", color: "#666666" }}>摇滚</a>
              <a href="/discover/playlist/?cat=%E6%B0%91%E8%B0%A3" style={{ padding: "0px 10px", fontSize: "12px", color: "#666666" }}>民谣</a>
              <a href="/discover/playlist/?cat=%E7%94%B5%E5%AD%90" style={{ padding: "0px 10px", fontSize: "12px", color: "#666666" }}>电子</a>
            </div>

            <span style={{ marginTop: "9px", fontSize: "12px", marginLeft: "39%" }}>
              <a href="/discover/playlist/" style={{ color: "#666666" }}>更多</a>
            </span>

          </div>
          <ul style={{ padding: "0 0" }}>

            {songList.map((item, index) => {
              return (
                <li key={index} style={{ listStyle: "none", width: "140px", height: '210px', float: "left", margin: "10px 25px 15px 12px" }}>
                  <div>
                    <a href={`/playlist?id=${item.id}`} title={item.name} style={{ color: "#000000" }}>
                      <img src={`${item.picUrl}?param=140y140`} alt="测试内容" />
                    </a>
                    <div className="bottom"></div>
                  </div>
                  <p style={{ wordWrap: "break-word" }}>
                    <a href={`/playlist?id=${item.id}`} title={item.name} style={{ color: "#000000", wordWrap: "break-word" }}>
                      {item.name}
                    </a>
                  </p>
                </li>
              )
            })}

          </ul>

        </div>

        <div style={{ width: '25%', height: '1400px', border: "1px solid black" }}>
          测试测试
        </div>

      </div>



      {/* 底部播放器 */}
      <div style={{ height: "53px", backgroundColor: "#262626", position: "fixed", left: "0px", bottom: "0px", width: "100%", zIndex: "9999" }}>
        {/* <audio preload="auto" src="/asset/caiyilin.mp3" controls onCanPlay={playMusic}></audio> */}

        <audio preload="auto" src="/asset/caiyilin.mp3" ref={music}></audio>

        {/* <div style={{width:"50%",height:"53px",backgroundColor:"white" ,margin:"0 auto"}}> */}
        {/* <div> */}
        {/* <div style={{backgroundImage:"url('/asset/player.png')", backgroundPosition:"0, -156px", backgroundSize:'cover', backgroundRepeat: 'no-repeat'}}></div> */}
        {/* <img src="/asset/playbar.png" alt="" style={{backgroundPosition:"0, -156px"}}/> */}
        {/* </div> */}
        {/* </div> */}
        <div style={{ width: "50%", height: "53px", margin: "10px auto", display: 'flex' }}>

          <div className='btns' style={{ height: '36px', width: '137px' }}>
            <LeftCircleOutlined style={{ fontSize: "28px", padding: '0 6px', color: 'white' }} />
            <PlayCircleOutlined style={{ fontSize: "36px", padding: '0 6px', color: 'white' }} onClick={playMusic} ref={playIcon} />
            <PauseCircleOutlined style={{ fontSize: "36px", padding: '0 6px', color: 'white', display: 'none' }} onClick={pauseMusic} ref={pauseIcon} />
            <RightCircleOutlined style={{ fontSize: "28px", padding: '0 6px', color: 'white' }} />
          </div>


          <div style={{ width: "35px", height: "35px", border: '1px solid black', margin: '0 15px 0 15px' }}>
            {/* <img src="" alt=""/> */}
            歌曲图
          </div>

          <div className="play" style={{ width: '60%' }}>
            <div className="word">
              <a href="/#" title="测试曲名" style={{ fontSize: "12px", color: "#E8E8E8", marginRight: '10px' }}>测试曲名</a>
              <span title="测试艺人">
                <a href="/#" style={{ fontSize: "12px", color: '#9B9B9B', marginRight: '10px' }}>测试艺人</a>
              </span>
              <a href="/#" title="来源" style={{ fontSize: "12px", color: '#9B9B9B' }}>来源</a>
            </div>

            {/* 播放条 */}
            <div className="playBar" ref={playBar} style={{ width: '100%', height: '100%' }}>
              {/* 进度条的总长度 */}
              <span
                className="lineWrap"
                // onMouseMove={handleMouseMove}
                // onMouseUp={handleMouseUp}
                // onMouseLeave={handleMouseUp}
                // onClick={clcikLine}
                ref={playLine}
                style={{ width: '85%', height: '10px', backgroundColor: '#535353', display: 'inline-block', cursor: 'pointer', position: 'relative', border: '1px solid #535353', borderRadius: '25px' }}
              >
                {/* 中间的滑块 */}
                <span className="lineInner" ref={playSlider} style={{ left: '-3px', height: '100%', display: 'inline-block', backgroundColor: '#C30C0C', position: 'absolute', border: '1px solid #C30C0C', borderRadius: '25px' }}>
                  {/* 可拖拽的圆点 */}
                  <span
                    className="lineDot"
                    // onMouseDown={handleMouseDown}
                    ref={playDot}
                    style={{ top: '-5px', right: '-12px', width: '15px', height: '15px', backgroundColor: '#FFFFFF', border: '1px solid #fff', borderRadius: '50%', position: 'absolute', }}
                  />
                </span>
              </span>

              <span style={{ float: 'right' }}>
                <em style={{ color: 'rgb(154, 148, 140)', fontFamily: 'Arial, Helvetica, sans-serif' }}>{playNowTime}</em>
                <em style={{ color: 'rgb(154, 148, 140)' }}>/</em>
                <em style={{ color: 'rgb(154, 148, 140)', fontFamily: 'Arial, Helvetica, sans-serif' }}>{duration}</em>
              </span>
            </div>


          </div>

        </div>

      </div>

    </>
  )
}

export default Home;