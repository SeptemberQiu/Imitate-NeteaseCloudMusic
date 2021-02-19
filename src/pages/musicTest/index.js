



export default class ListenAudio extends PureComponent {

  state = {
    iconType: 'caret-right',
    currentTime: '00:00',
    percent: 0,
    duration: '00:00',
    speed: '1',
    length: 0
  }

  componentDidMount() {
    const audio = this.refs.audio;

    if (audio !== null) {
      audio.load();
      audio.oncanplay = () => {
        this.setState({
          duration: this.transTime(Math.floor(audio.duration)),
          currentTime: this.transTime(0),
          length: audio.duration
        });
      };
    }
  }

  componentWillUnmount() {
    const audio = this.refs.audio;
    audio.removeEventListener('timeupdate', this.updateProgress);
    audio.removeEventListener('ended', this.audioEnded);
    audio.pause();
  }

  transTime = (time) => {
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

  playAudio = () => {
    const audio = this.refs.audio;
    audio.addEventListener('timeupdate', this.updateProgress, false);
    audio.addEventListener('ended', this.audioEnded, false);
    
    if (this.state.iconType === 'caret-right') {
      audio.play();
      this.setState({
        iconType: 'pause'
      });
    } else {
      audio.pause();
      this.setState({
        iconType: 'caret-right'
      });
    }
  }

  updateProgress = () => {
    const audio = this.refs.audio;
    this.setState({
      percent: Math.round((Math.floor(audio.currentTime) / Math.floor(audio.duration)) * 100, 0),
      currentTime: this.transTime(Math.floor(audio.currentTime))
    });
  }
  audioEnded = () => {
    const audio = this.refs.audio;
    audio.pause();
    this.setState({
      iconType: 'caret-right'
    });
  }

  changeSpeed = (speed) => {
    if (speed === this.state.speed) return;
    const audio = this.refs.audio;
    audio.playbackRate = speed - 0;
    this.setState({
      speed: speed
    });
  }


  render() {

    const { url } = this.props;
    const { currentTime, iconType, percent, duration, speed, length } = this.state;
    return (

      <div>

        <audio ref="audio" src={url} style={{ visibility: 'hidden' }}></audio>

        <div className={styles.audioCont}>

          <div className={styles.btn} onClick={this.playAudio}>
            <Icon type={iconType} />
          </div>

          <div className={styles.currentTime}>{currentTime}</div>

          <div className={styles.speed}>
            <Button size="small" className={speed === '1' && 'active' || ''} onClick={() => this.changeSpeed('1')}>1X</Button>
            <Button size="small" className={speed === '2' && 'active' || ''} onClick={() => this.changeSpeed('2')}>2X</Button>
            <Button size="small" className={speed === '3' && 'active' || ''} onClick={() => this.changeSpeed('3')}>3X</Button>
          </div>

          <div className={styles.progress}>
            <Progress percent={percent} strokeColor="#222" showInfo={false} />
            {/* <Slider value={percent} showInfo={false} tipFormatter={(v) => this.transTime(v * Math.round(length) / 100)} onChange={(v) => this.handleChangePercent(v)} /> */}
          </div>

          <div className={styles.duration}>{duration}</div>

        </div>

      </div>
    );
  }
}