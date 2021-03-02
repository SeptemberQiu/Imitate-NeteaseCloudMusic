// import React, { useEffect, useRef } from 'react';
// import './playbar.css';
// import { LeftCircleOutlined, RightCircleOutlined, PlayCircleOutlined, PauseCircleOutlined, PlusOutlined, FolderAddOutlined } from '@ant-design/icons';

// const PlayBar = (props) => {

//   const music = useRef(null);
//   const playBar = useRef(null);
//   const playLine = useRef(null);
//   const playIcon = useRef(null);
//   const pauseIcon = useRef(null);
//   const playSlider = useRef(null);
//   const playDot = useRef(null);

//   useEffect(() => {
//     props.onPlayRef('play', playIcon.current );
//     // props.onPlayRef('test',playBar.current);
//   })


//   const playMusic = () => {
//     // setPlayStatus(true);
//     music.current.play();
//     playIcon.current.style.display = 'none';
//     pauseIcon.current.style.display = '';
//     // 播放的时候计算时长
//     // console.log(duration);
//     // let dura = transTime(Math.floor(duration));
//     // setDuration(dura); 
//     // console.log("歌曲时长", dura);

//     // music.current.addEventListener('timeupdate', updateProgress, false);
//     music.current.onended = () => {
//       alert("歌曲结束");
//     }
//   }

//   const pauseMusic = () => {
//     // setPlayStatus(false);
//     playIcon.current.style.display = '';
//     pauseIcon.current.style.display = 'none';
//     music.current.pause();
//   }




//   return (
//     <>
//       <div className="bottom-player">
//         <audio preload="auto" ref={music}></audio>

//         <div style={{ width: "50%", height: "53px", margin: "10px auto", display: 'flex' }}>

//           <div className='btns' style={{ height: '36px', width: '137px' }}>
//             <LeftCircleOutlined style={{ fontSize: "28px", padding: '0 6px', color: 'white' }} />
//             <PlayCircleOutlined style={{ fontSize: "36px", padding: '0 6px', color: 'white' }} onClick={playMusic} ref={playIcon} />
//             <PauseCircleOutlined style={{ fontSize: "36px", padding: '0 6px', color: 'white', display: 'none' }} onClick={pauseMusic} ref={pauseIcon} />
//             <RightCircleOutlined style={{ fontSize: "28px", padding: '0 6px', color: 'white' }} />
//           </div>

//           <div className="song-avatar">
//             {/* <img src="" alt=""/> */}
//             歌曲图
//           </div>

//           <div className="play" style={{ width: '60%' }}>
//             <div className="word">
//               <a href="/#" title="测试曲名" style={{ fontSize: "12px", color: "#E8E8E8", marginRight: '10px' }}>
//                 {/* {songName} */}
//                 </a>
//               <span title="测试艺人">
//                 <a href="/#" style={{ fontSize: "12px", color: '#9B9B9B', marginRight: '10px' }}>测试艺人</a>
//               </span>
//               <a href="/#" title="来源" style={{ fontSize: "12px", color: '#9B9B9B' }}>来源</a>
//             </div>

//             {/* 播放条 */}
//             <div className="play-bar" ref={playBar}>
//               {/* 进度条的总长度 */}
//               <span
//                 className="line-wrap"
//                 // onMouseMove={handleMouseMove}
//                 // onMouseUp={handleMouseUp}
//                 // onMouseLeave={handleMouseUp}
//                 // onClick={clcikLine}
//                 ref={playLine}
//               >

//                 {/* 中间的滑块 */}
//                 <span className="line-inner" ref={playSlider}>

//                   {/* 可拖拽的圆点 */}
//                   <span
//                     className="line-dot"
//                     // onMouseDown={handleMouseDown}
//                     ref={playDot}
//                   />
//                 </span>
//               </span>

//               <span style={{ float: 'right' }}>
//                 <em style={{ color: 'rgb(154, 148, 140)', fontFamily: 'Arial, Helvetica, sans-serif' }}>
//                   {/* {playNowTime} */}
//                 </em>
//                 <em style={{ color: 'rgb(154, 148, 140)' }}>/</em>
//                 <em style={{ color: 'rgb(154, 148, 140)', fontFamily: 'Arial, Helvetica, sans-serif' }}>
//                   {/* {duration} */}
//                 </em>
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   )
// }

// export default PlayBar;
// // 原始

//       // {/* 底部播放器 */}
//       // <div style={{ height: "53px", backgroundColor: "#262626", position: "fixed", left: "0px", bottom: "0px", width: "100%", zIndex: "9999" }}>
//       //   {/* <audio preload="auto" src="/asset/caiyilin.mp3" controls onCanPlay={playMusic}></audio> */}
//       //   {/* 加载本地的音乐 */}
//       //   {/* <audio preload="auto" src="/asset/caiyilin.mp3" ref={music}></audio> */}
//       //   <audio preload="auto" ref={music}></audio>
//       //   {/* <audio preload="auto" src={`https://music.163.com/song?id=${99999}`} ref={music}></audio> */}
//       //   {/* <div style={{width:"50%",height:"53px",backgroundColor:"white" ,margin:"0 auto"}}> */}
//       //   {/* <div> */}
//       //   {/* <div style={{backgroundImage:"url('/asset/player.png')", backgroundPosition:"0, -156px", backgroundSize:'cover', backgroundRepeat: 'no-repeat'}}></div> */}
//       //   {/* <img src="/asset/playbar.png" alt="" style={{backgroundPosition:"0, -156px"}}/> */}
//       //   {/* </div> */}
//       //   {/* </div> */}
//       //   <div style={{ width: "50%", height: "53px", margin: "10px auto", display: 'flex' }}>
//       //     <div className='btns' style={{ height: '36px', width: '137px' }}>
//       //       <LeftCircleOutlined style={{ fontSize: "28px", padding: '0 6px', color: 'white' }} />
//       //       <PlayCircleOutlined style={{ fontSize: "36px", padding: '0 6px', color: 'white' }} onClick={playMusic} ref={playIcon} />
//       //       <PauseCircleOutlined style={{ fontSize: "36px", padding: '0 6px', color: 'white', display: 'none' }} onClick={pauseMusic} ref={pauseIcon} />
//       //       <RightCircleOutlined style={{ fontSize: "28px", padding: '0 6px', color: 'white' }} />
//       //     </div>
//       //     <div style={{ width: "35px", height: "35px", border: '1px solid black', margin: '0 15px 0 15px' }}>
//       //       {/* <img src="" alt=""/> */}
//       //       歌曲图
//       //     </div>

//       //     <div className="play" style={{ width: '60%' }}>
//       //       <div className="word">
//       //         <a href="/#" title="测试曲名" style={{ fontSize: "12px", color: "#E8E8E8", marginRight: '10px' }}>{songName}</a>
//       //         <span title="测试艺人">
//       //           <a href="/#" style={{ fontSize: "12px", color: '#9B9B9B', marginRight: '10px' }}>测试艺人</a>
//       //         </span>
//       //         <a href="/#" title="来源" style={{ fontSize: "12px", color: '#9B9B9B' }}>来源</a>
//       //       </div>

//       //       {/* 播放条 */}
//       //       <div className="playBar" ref={playBar} style={{ width: '100%', height: '100%' }}>
//       //         {/* 进度条的总长度 */}
//       //         <span
//       //           className="lineWrap"
//       //           // onMouseMove={handleMouseMove}
//       //           // onMouseUp={handleMouseUp}
//       //           // onMouseLeave={handleMouseUp}
//       //           // onClick={clcikLine}
//       //           ref={playLine}
//       //           style={{ width: '85%', height: '10px', backgroundColor: '#535353', display: 'inline-block', cursor: 'pointer', position: 'relative', border: '1px solid #535353', borderRadius: '25px' }}
//       //         >
//       //           {/* 中间的滑块 */}
//       //           <span className="lineInner" ref={playSlider} style={{ left: '-3px', height: '100%', display: 'inline-block', backgroundColor: '#C30C0C', position: 'absolute', border: '1px solid #C30C0C', borderRadius: '25px' }}>
//       //             {/* 可拖拽的圆点 */}
//       //             <span
//       //               className="lineDot"
//       //               // onMouseDown={handleMouseDown}
//       //               ref={playDot}
//       //               style={{ top: '-5px', right: '-12px', width: '15px', height: '15px', backgroundColor: '#FFFFFF', border: '1px solid #fff', borderRadius: '50%', position: 'absolute', }}
//       //             />
//       //           </span>
//       //         </span>
//       //         <span style={{ float: 'right' }}>
//       //           <em style={{ color: 'rgb(154, 148, 140)', fontFamily: 'Arial, Helvetica, sans-serif' }}>{playNowTime}</em>
//       //           <em style={{ color: 'rgb(154, 148, 140)' }}>/</em>
//       //           <em style={{ color: 'rgb(154, 148, 140)', fontFamily: 'Arial, Helvetica, sans-serif' }}>{duration}</em>
//       //         </span>
//       //       </div>
//       //     </div>
//       //   </div>
//       // </div>