import React, { useState, useEffect, useRef } from 'react'
import 'antd/dist/antd.css';
import './home.css';
import Nav from '../../component/Nav/index';
import axios from 'axios';
import { LeftCircleOutlined, RightCircleOutlined, PlayCircleOutlined, PauseCircleOutlined, PlusOutlined, FolderAddOutlined, CloseOutlined, CustomerServiceOutlined } from '@ant-design/icons';
import { getPlayMusicUrl } from '../utils/data-format';
// eslint-disable-next-line
import Cookies from 'js-cookie';


const Home = () => {

  const [songList, setSongList] = useState([]);
  // eslint-disable-next-line
  const [billboardList, setBillboardList] = useState([]);
  const [soarList, setSoarList] = useState([]);
  // eslint-disable-next-line
  const [playStatus, setPlayStatus] = useState(false); // 播放状态， true 播放中， false 暂停中
  const [duration, setDuration] = useState('00:00');    // 音频的时长
  const [playNowTime, setPlayNowTime] = useState('00:00');  // 当前的播放时间
  const [songName, setSongName] = useState('');
  const [songAvatar, setSongAvatar] = useState('asset/default_album.jpg');
  const [songArtist, setSongArtist] = useState('');
  // eslint-disable-next-line
  const [songPlayStack, setSongPlayStack] = useState([]);
  // const [artistId, setArtistId] = useState();
  const [songPlayListStatus, setSongPlayListStatus] = useState(true);

  // eslint-disable-next-line
  const [url, setUrl] = useState();
  // eslint-disable-next-line
  const [percent, setPercent] = useState(0);

  const music = useRef(null);
  const playIcon = useRef(null);
  const pauseIcon = useRef(null);
  const playBar = useRef(null);
  const playLine = useRef(null);
  const playSlider = useRef(null);
  const playDot = useRef(null);
  const playList = useRef(null);

  // const playBtn = useRef(null);
  // const addPlayListBtn = useRef(null);
  // const likeBtn = useRef(null);

  useEffect(() => {
    getSongList();

    // 获取榜单数据
    const getBillboardList = () => {
      axios.get('http://localhost:3000/toplist')
        .then((res) => {
          // console.log(res);
          let result = res.data.list.slice(0, 3);
          console.log(result);
          setBillboardList(result);
          getSoaringList(result[0].id);
        })
        .catch((err) => {
          console.log(err);
        })
    }
    getBillboardList();
  }, []);

  const getSongList = () => {
    axios.get('http://localhost:3000/personalized', {
      limit: 1
    })
      .then((res) => {
        let list = res.data.result.slice(0, 8);
        setSongList(list);
      })
      .catch((error) => {
        console.log(error);
      });
  }



  // 获取飙升榜歌曲
  const getSoaringList = (soarId) => {
    axios.get(`http://localhost:3000/playlist/detail?id=${soarId}`)
      .then((res) => {
        // console.log(res);
        let result = res.data.playlist.tracks.slice(0, 10);
        // console.log(result);
        setSoarList(result);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const playMusic = () => {
    setPlayStatus(true);
    music.current.play();
    playIcon.current.style.display = 'none';
    pauseIcon.current.style.display = '';
    music.current.addEventListener('timeupdate', updateProgress, false);
    music.current.onended = () => {
      alert("歌曲结束");
    }
  }

  const pauseMusic = () => {
    setPlayStatus(false);
    playIcon.current.style.display = '';
    pauseIcon.current.style.display = 'none';
    music.current.pause();
  }

  const updateProgress = () => {
    // console.log(music.current.duration);
    let dura = transTime(Math.floor(music.current.duration));
    setDuration(dura);
    let value = music.current.currentTime / music.current.duration;
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

  // 点击播放按钮
  const playBtn = (item, e) => {
    e.preventDefault();
    console.log(item);
    axios.get(`http://localhost:3000/album?id=${item.al.id}`)
      .then((res => {
        console.log(res);
        setSongAvatar(res.data.album.picUrl);
        setSongArtist(res.data.album.artist.name);
        // setArtistId(res.data.album.artist.id);
      }))
      .catch((err => {
        console.log(err);
      }))


    let songId = item.id;
    setSongName(item.name);
    setDuration(item.dt);
    music.current.src = getPlayMusicUrl(songId);
    music.current.play();
    playMusic();
  }

  // 点击添加到播放列表
  const addPlayListBtn = (item, e) => {
    // 需要专辑ID，歌曲ID， 歌曲时长dt，歌曲歌词
    e.preventDefault();
    console.log(item);
  }

  // 点击收藏按钮
  const likeBtn = () => {
  }

  const onClosePlayList = () => {
    setSongPlayListStatus(true);
    playList.current.style.display = 'none';
  }

  const onShowPlayList = () => {
    if (songPlayListStatus) {
      playList.current.style.display = 'block';
      setSongPlayListStatus(false);
    } else {
      playList.current.style.display = 'none';
      setSongPlayListStatus(true);
    }
  }

  return (
    <>
      <Nav />

      {/* 头部 */}
      <div className="header">
        {/* 中部区域 */}
        <div style={{ width: '50%', height: '285px', margin: '0 auto', background: 'red', minWidth: "960px", display: 'flex', justifyContent: 'center' }}>
          {/* Banner */}
          <div style={{ width: '75%' }}>

          </div>

          {/* 下载 */}
          <div className="download-pic" style={{ background: "url('asset/download.png') center", width: '25%', height: '285px', border: "1px solid black", position: 'relative' }}>
            <a href="/#" style={{ display: 'block', width: '214px', height: '56px', position: 'absolute', top: '184px', left: '12px' }}></a>
            <p style={{ color: 'rgb(160, 152, 139)', fontSize: '12px', textAlign: 'center', height: '45px', width: '100%', lineHeight: '45px', position: 'absolute', bottom: '0', left: '0', margin: '0' }}>PC 安卓 iPhone WP iPad Mac 六大客户端</p>
          </div>
        </div>


      </div>

      <div style={{ width: "50%", height: '1200px', border: '1px solid black', display: "flex", justifyContent: 'center', margin: "0 auto", minWidth: "960px" }}>
        {/* 左侧区域 */}
        <div style={{ width: '75%', border: "1px solid black", height: '1200px' }}>
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

          <div style={{ border: '1px solid red', height: '500px' }}>
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


          {/* 榜单 */}
          <div className="billboard">
            <div className="w-hd2" style={{ height: '35px', borderBottom: "2px solid #C10D0C" }}>
              <a href="/discover/toplist" style={{ paddingLeft: "45px", fontSize: "20px", color: "#333333", marginBottom: "5px" }}>榜单</a>
              <span style={{ marginTop: "9px", fontSize: "12px", float: "right", marginRight: "20px" }}>
                <a href="/discover/toplist" style={{ color: "#666666" }}>更多</a>
              </span>
            </div>

            <div className="bill-list" style={{ display: 'flex' }}>

              <dl style={{ border: '1px solid #C7C7C7', margin: '0 0 0 10px' }}>
                <dt style={{ width: '230px', height: '120px', borderBottom: '1px solid black', backgroundColor: '#F4F4F4' }}>
                  {/* <img src={billboardList[0].coverImgUrl} alt={billboardList[0].name} width='80px' height='80px'/> */}
                  飙升榜
                </dt>
                <dd style={{ margin: '0' }}>
                  <ol style={{ listStyle: 'none', margin: '0' }}>
                    {soarList.map((item, index) => {
                      return (
                        <li key={item.id} className="bill-line-list" >
                          <span className="songNumber">{`${index + 1}`}</span>
                          <a href={`/song?id=${item.id}`} title={item.name} className="song-hover">
                            {item.name}
                          </a>

                          <div className="oper" >
                            <a href="/#" title="播放" style={{ color: '#797878', margin: '0 6px' }} onClick={(e) => playBtn(item, e)}><PlayCircleOutlined style={{ fontSize: '17px' }} /></a>
                            {/* <a href="/#" title="播放" style={{color:'#797878',margin:'0 6px'}} onClick={playBtn}><PlayCircleOutlined style={{fontSize:'17px'}}/></a> */}
                            <a href="/#" title="添加到播放列表" style={{ color: '#999999' }} onClick={(e) => addPlayListBtn(item, e)}><PlusOutlined style={{ fontSize: '17px' }} /></a>
                            <a href="/#" title="收藏" style={{ color: '#949391', marginLeft: '6px' }} onClick={likeBtn}><FolderAddOutlined style={{ fontSize: '17px' }} /></a>
                          </div>

                        </li>
                      )
                    })}
                  </ol>

                  <div className="billboard-more">
                    <a href={`/discover/toplist?id=99999`}
                      style={{
                        lineHeight: '32px',
                        fontSize: '12px',
                        color: '#1F1F1F',
                        float: 'right',
                        marginRight: '30px',
                      }}>
                      查看全部
                    </a>
                  </div>
                </dd>
              </dl>

              <dl style={{ border: '1px solid #C7C7C7', margin: '0' }}>
                <dt style={{ width: '230px', height: '120px', borderBottom: '1px solid black', backgroundColor: '#F4F4F4' }}>
                  {/* <img src={billboardList[1].coverImgUrl} alt={billboardList[1].name} width='80px' height='80px'/> */}
                  新歌榜
                </dt>
                <dd style={{ margin: '0' }}>
                  <ol style={{ listStyle: 'none', margin: '0' }}>
                    {soarList.map((item, index) => {
                      return (
                        <li key={item.id} style={{ height: '32px', lineHeight: '32px' }} className="bill-line-list">
                          <span className="songNumber">{`${index + 1}`}</span>
                          <a href={`/song?id=${item.id}`} title={item.name} className="song-hover">
                            {item.name}
                          </a>
                        </li>
                      )
                    })}
                  </ol>

                  <div className="billboard-more" style={{ height: '32px', width: '100%', backgroundColor: '#E8E8E8' }}>
                    <a href={`/discover/toplist?id=99999`}
                      style={{
                        lineHeight: '32px',
                        fontSize: '12px',
                        color: '#1F1F1F',
                        float: 'right',
                        marginRight: '30px',
                      }}>
                      查看全部
                    </a>
                  </div>
                </dd>
              </dl>

              <dl style={{ border: '1px solid #C7C7C7', margin: '0' }}>
                <dt style={{ width: '230px', height: '120px', borderBottom: '1px solid black', backgroundColor: '#F4F4F4' }}>
                  {/* <img src={billboardList[2].coverImgUrl} alt={billboardList[2].name} width='80px' height='80px'/> */}
                  原创榜
                </dt>
                <dd style={{ margin: '0' }}>
                  <ol style={{ listStyle: 'none', margin: '0' }}>
                    {soarList.map((item, index) => {
                      return (
                        <li key={item.id} style={{ height: '32px', lineHeight: '32px' }} className="bill-line-list">
                          <span className="songNumber">{`${index + 1}`}</span>
                          <a href={`/song?id=${item.id}`} title={item.name} className="song-hover">
                            {item.name}
                          </a>
                        </li>
                      )
                    })}
                  </ol>

                  <div className="billboard-more" style={{ height: '32px', width: '100%', backgroundColor: '#E8E8E8' }}>
                    <a href={`/discover/toplist?id=99999`}
                      style={{
                        lineHeight: '32px',
                        fontSize: '12px',
                        color: '#1F1F1F',
                        float: 'right',
                        marginRight: '30px',
                      }}>
                      查看全部
                    </a>
                  </div>
                </dd>
              </dl>
            </div>

          </div>

        </div>

        <div style={{ width: '25%', height: '1200px', border: "1px solid black" }}>
          测试测试
        </div>

      </div>

      {/* 底部播放器 */}
      <div style={{ height: "53px", backgroundColor: "#262626", position: "fixed", left: "0px", bottom: "0px", width: "100%", zIndex: "9999" }}>
        <audio preload="auto" ref={music}></audio>
        <div style={{ width: "50%", height: "53px", margin: "10px auto", display: 'flex', position: 'relative' }}>

          <div className='btns' style={{ height: '36px', width: '137px' }}>
            <LeftCircleOutlined style={{ fontSize: "28px", padding: '0 6px', color: 'white' }} />
            <PlayCircleOutlined style={{ fontSize: "36px", padding: '0 6px', color: 'white' }} onClick={playMusic} ref={playIcon} />
            <PauseCircleOutlined style={{ fontSize: "36px", padding: '0 6px', color: 'white', display: 'none' }} onClick={pauseMusic} ref={pauseIcon} />
            <RightCircleOutlined style={{ fontSize: "28px", padding: '0 6px', color: 'white' }} />
          </div>

          <div style={{ width: "35px", height: "35px", border: '1px solid black', margin: '0 15px 0 15px' }}>
            <img src={songAvatar} alt="" width="35px" height="35px" />
          </div>

          <div className="play" style={{ width: '60%' }}>
            <div className="word">
              <a href="/#" title={songName} style={{ fontSize: "12px", color: "#E8E8E8", marginRight: '10px' }}>{songName}</a>
              <span title={songArtist}>
                <a href='/#' style={{ fontSize: "12px", color: '#9B9B9B', marginRight: '10px' }}>{songArtist}</a>
              </span>
              {/* <a href="/#" title="来源" style={{ fontSize: "12px", color: '#9B9B9B' }}>来源</a> */}
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


          <div className="play-bar-right" style={{ width: '113px', height: '36px', backgroundColor: 'white', position: 'absolute', right: '0' }}>

            <span className="play-song-stack" style={{ width: '60px', height: '25px' }}>
              <span className="tip" style={{ display: 'none' }}>已添加到播放列表</span>
              <a href="/#" title="播放列表" className="show-play-list" onClick={onShowPlayList}>
                <CustomerServiceOutlined />
                <em>5</em>

                {/* <img alt="" style={{ position: '' }} src='asset/playbar.png' style={{ width: '60px', height: '25px' }} /> */}
              </a>
            </span>

          </div>

          {/* 播放列表 */}
          <div className="list" ref={playList}>

            <div className="listhd">

              <div className="list-hd-left">

                <h4 style={{ color: '#BDBAB6', marginLeft: '30px', lineHeight: '40px' }}>
                  播放列表
                </h4>

                <div className="list-hd-left-two">
                  <a href="/#">收藏全部</a>
                  <a href="/#">清除</a>
                </div>
              </div>

              <div className="list-hd-right">
                <p></p>
                <span className="close" onClick={onClosePlayList}>
                  <CloseOutlined />
                </span>
              </div>


            </div>

            <div className="song-play-list">
              <div className="listbd">
                <div className="list-left">

                </div>
              </div>

              <div className="list-bd-right">
                <div className="list-lyric">

                </div>
              </div>
            </div>

          </div>

        </div>

      </div>

    </>
  )
}

export default Home;