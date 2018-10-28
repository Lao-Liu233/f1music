import React from "react";
import { connect } from "dva";
import { Spin, Input, Rate, Button, message } from "antd";
import { CSSTransitionGroup } from "react-transition-group";
import styles from "./VoteList.css";
import YPlayer from "./YPlayer";
import { config } from "utils";

const { voteTexts } = config;

class VoteList extends React.Component {
  state = {
    rate: 0,
    src: "",
    reason: "",
    index: "",
    canVote: false,
    canSubmit: false,
    showReport: false,
    triggerVote: true,
    countDown: 31,
    canBackward: false,
    canForward: false
  };

  init = () => {
    this.setState({
      rate: 0,
      countDown: 31,
      reason: "",
      canVote: false,
      canSubmit: false,
      showReport: false,
      triggerVote: true,
      canBackward: false,
      canForward: false
    });
  };
  stopLast = () => {
    this.player.stop();
  };
  onRedirect = () => {
    this.stopLast();
    this.setState({ index: "", src: "" });
    this.init();
  };
  timeListener = offset => {
    const { dispatch, vote } = this.props;
    const { songs } = vote;
    const song = songs[this.state.index];
    if (this.state.countDown > 0) {
      this.setState(prevState => {
        return { countDown: prevState.countDown - offset };
      });
    } else {
      if (!song.listened && song.vote === 0) {
        dispatch({ type: "vote/markListened", payload: song.id });
      }
      //triggerVote: Only when first listen
      if (this.state.triggerVote) {
        this.setState({ triggerVote: false });
        this.handleVote();
      }
    }
  };
  handleSwitch = index => {
    const { vote } = this.props;
    const { songs } = vote;
    const player = this.player;
    if (index !== this.state.index) {
      this.setState({ index: index }, () => {
        this.updateButtonStatus();
      });
      this.stopLast();
      this.init();
      this.setState({ src: songs[index].url }, () => {
        player.play();
      });
      if (songs[index].vote !== 0 || songs[index].listened) {
        this.setState({
          countDown: 0,
          rate: songs[index].vote,
          triggerVote: false
        });
      } else {
        this.setState({ countDown: 31 });
      }
    } else {
      player.toggle();
    }
    return index;
  };
  updateButtonStatus = () => {
    const { vote } = this.props;
    const { songs } = vote;
    const previous = Number(this.state.index) - 1;
    const next = Number(this.state.index) + 1;
    this.setState({
      canBackward: songs[previous] !== undefined,
      canForward: songs[next] !== undefined
    });
  };
  forward = () => {
    const { vote } = this.props;
    const { songs, skipVoted } = vote;
    let newIndex = Number(this.state.index) + 1;
    if (skipVoted) {
      while (songs[newIndex] && songs[newIndex].vote !== 0) {
        newIndex++;
      }
    }
    if (songs[newIndex]) {
      this.handleSwitch(newIndex);
    }
  };
  backward = () => {
    const { vote } = this.props;
    const { songs } = vote;
    const newIndex = Number(this.state.index) - 1;
    if (songs[newIndex]) {
      this.handleSwitch(newIndex);
    }
  };
  checkValidity = () => {
    if (this.state.countDown > 0) {
      message.warning("试听时长需达到30秒才能投票");
      const player = this.player;
      player.audio.currentTime = 0;
      player.play();
      return "time";
    }
    if (!this.state.canSubmit || this.state.rate === 0) {
      message.info("选择或更改评价后即可提交");
      return "rate";
    }
    return "valid";
  };
  handleVote = (type = null) => {
    const { dispatch, vote } = this.props;
    const { songs, skipAfterSubmitted } = vote;
    const song = songs[this.state.index];
    const validity = this.checkValidity();
    if (validity !== "valid") {
      return;
    }
    const id = song.id;
    const rate = this.state.rate;
    dispatch({ type: "vote/vote", payload: { id, rate } }).then(success => {
      if (success) {
        message.success("投票成功");
        this.setState({ canSubmit: false });
        if ((type === "manual" && skipAfterSubmitted) || type === "ended") {
          this.forward();
        }
      }
    });
  };
  onEnded = () => {
    const { vote } = this.props;
    const { songs, skipWhenEnded } = vote;
    const song = songs[this.state.index];
    const validity = this.checkValidity();
    if (song.vote === 0) {
      if (validity === "valid") {
        this.handleVote("ended");
      } else if (validity === "rate" && skipWhenEnded) {
        this.forward();
      }
    } else {
      this.forward();
    }
  };
  handleReport = () => {
    const { dispatch, vote } = this.props;
    const { songs } = vote;
    const id = songs[this.state.index].id;
    dispatch({
      type: "vote/report",
      payload: { id: id, reason: this.state.reason }
    }).then(success => {
      if (success) {
        this.setState({ showReport: false });
      }
    });
  };
  render() {
    const { vote, loading } = this.props;
    const { isDesktop, songs } = vote;
    const song = songs[this.state.index]
      ? songs[this.state.index]
      : { vote: 0 };
    const buttonProps = {
      type: song.vote !== 0 ? "secondary" : "primary",
      shape: !isDesktop ? "circle" : undefined,
      icon: this.state.countDown <= 0 ? "check" : undefined,
      disabled: this.state.countDown > 0
    };
    const voteArea = (
      <div className={styles.voteArea} key="vote">
        <hr />
        <Rate
          value={this.state.rate}
          onChange={value => this.setState({ rate: value, canSubmit: true })}
          className={styles.rate}
        />
        {this.state.rate !== 0 && (
          <div className={styles.voteText}>
            <span className="ant-rate-text">{voteTexts[this.state.rate]}</span>
          </div>
        )}
        <Button
          loading={loading.effects["vote/vote"]}
          className={styles.voteButton}
          onClick={() => this.handleVote("manual")}
          {...buttonProps}
        >
          {this.state.countDown > 0
            ? Math.floor(this.state.countDown)
            : isDesktop && "投票"}
        </Button>
      </div>
    );
    const reportArea = (
      <div className={styles.reportArea} key="report">
        <Input
          value={this.state.reason}
          placeholder="举报原因"
          className={styles.reason}
          onChange={e => this.setState({ reason: e.target.value })}
          maxLength="60"
        />
        <Button
          type="primary"
          onClick={this.handleReport}
          loading={loading.effects["vote/report"]}
          className={styles.reportButton}
        >
          提交
        </Button>
      </div>
    );
    const list = songs.map((song, key) => {
      const current = key === this.state.index;
      return (
        <li
          style={current ? { color: "#1890ff" } : {}}
          className={styles.listItem}
          onClick={() => this.handleSwitch(key)}
          key={key}
        >
          <span className={styles.itemIndex}>{key + 1}</span>
          {"您的投票: " + voteTexts[song.vote]}
        </li>
      );
    });

    return (
      <Spin spinning={loading.effects["vote/fetch"]}>
        <span>
          <div>
            <YPlayer
              src={this.state.src}
              onProgress={this.timeListener}
              onEnded={this.onEnded}
              canBackward={this.state.canBackward}
              canForward={this.state.canForward}
              onBackward={this.backward}
              onForward={this.forward}
              ref={player => (this.player = player)}
              className={styles.yplayer}
            />
            <br />
            <Button
              size="small"
              onClick={() =>
                this.setState({ showReport: !this.state.showReport })
              }
              disabled={this.state.index === ""}
              className={styles.toggleReport}
            >
              举报
            </Button>
          </div>
          <br />
          {voteArea}
          <CSSTransitionGroup
            transitionName="fade"
            transitionEnterTimeout={500}
            transitionLeaveTimeout={200}
          >
            {this.state.showReport && reportArea}
          </CSSTransitionGroup>
        </span>
        <ol className={styles.list}>{list}</ol>
      </Spin>
    );
  }
}

export default connect(
  ({ vote, loading }) => ({ vote, loading }),
  null,
  null,
  { withRef: true }
)(VoteList);
