import React from 'react';
import { Tabs } from 'antd';
const TabPane = Tabs.TabPane;

const Index = ({location}) => {
  return (
      <Tabs defaultActiveKey="vote">
        <TabPane tab="上传说明" key="upload">
          <p>每位同学最多推荐10首歌曲，<strong>上传前请确认您推荐的歌曲在同一时段尚未有人推荐</strong>，尽量不要重复上传(重复上传系统将予以提示)。</p>
          <p>此外，<strong>应德育处要求，希望大家踊跃上传优秀的国产歌曲</strong>。</p>

          <h3>手动上传:</h3>
          <p>音频格式只能为 mp3，并请保证有一定质量。歌曲时间控制在2-5分钟，大小介于2MB-15MB为宜，禁止上传超过20MB的歌曲。</p>
          <p>此外，曲目<strong>不得带有非伴奏性人声</strong>，最好不带有任何过于明显的人声。同时，请各位在挑选音乐的时候明确自己对全体师生的责任，在依据自身审美标准的同时考虑广大人民群众的需求。</p>
          <p>在提交新曲目时，需要参考各时段音乐要求选择一个推荐的播放时段，并填入曲名。“来源”一项表示此曲目的出处，可以填写该曲目来自的专辑、音乐家或节目、游戏等，<strong>不是表示上传者</strong>。如果不明来源可留空。上传时<strong>请先填写信息再上传文件</strong>。</p>
          <hr/>

          <h3>网易云音乐上传(不消耗流量):</h3>
          <p>请在搜索框内输入要搜索的歌曲名称，按回车键或点击右侧搜索按钮进行搜索，选择曲目时请确保歌曲不带有非伴奏性人声，否则一经发现将直接删除。</p>
          <p>搜索结果加载完毕后请根据歌曲信息找到您要推荐的曲目，点击后侧">"符号展开表单，"曲名"和"来源"两项可根据歌曲信息在下拉框中选择，其中"来源"一项将给出歌曲名称和专辑名称两个选项，如您发现歌曲信息不准确亦可手动输入或进行修改。</p>
          <p><strong>不支持上传版权歌曲</strong></p>

          <hr/>
          <p>出于公平性考虑，本次征集投票时将隐藏歌曲信息，因此将预先进行审核，对于严重恶搞、不符合要求、以及重复上传的内容，将直接删除。如果投票过程中发现上述情况，请点击播放器右下方的举报按钮进行举报，我们会尽快处理。此外，出于同样目的，上传时曲目的标签信息将被删除。但此操作耗时较多，因此上传进度到达100%后可能出现几秒的停顿，请耐心等待。</p>
        </TabPane>
        <TabPane tab="投票说明" key="vote">
          <p>为保证投票质量禁止使用校园网默认密码登录投票，使用默认密码的同学请先登录福州一中官网修改密码(推荐使用IE浏览器)。</p>

          <p>投票时请先选择一个时段，待页面加载完毕后展开播放器，歌曲播放30秒后将会显示打分栏，请综合您的感受及歌曲所在时段的音乐要求进行评价，选择"1星 - 非常不合适"、"2星 - 不合适"、"3星 - 中立"、"4星 - 合适"或"5星 - 非常合适"，然后点击提交按钮进行提交。</p>
          <p>虽然试听30秒后就会显示投票按钮，但仍然<strong>建议同学们至少试听1分钟后再提交投票</strong>，以免误判。</p>

          <p>如试听过程中出现卡顿或暂停可能为歌曲正在缓冲，请耐心等待，多次出现此问题请检查网络状况，遭遇错误请先刷新重试。</p>
          <p>播放器已设置为禁止调整播放进度，如需重听请点击右侧停止按钮。</p>
          <p>提交投票后仍可对评价进行更改并再次提交。</p>
          <p>若已对歌曲进行打分但未提交，播放完毕后将会自动提交。</p>

          <h3>自动播放(试验性功能):</h3>

          <ul>
            <li>展开播放器后自动开始播放</li>
            <li>手动提交投票或播放完毕自动提交成功后自动切换到下一首,并开始播放(不跨时段,部分浏览器不兼容)</li>
          </ul>

          <p>部分浏览器不支持此功能,如您在使用时发生错误,请在投票页面右上角关闭自动播放功能。</p>

          <p>为保证公平性，投票时的歌曲列表经过随机排列，但每个同学的曲目排序是固定不变的。投票时<strong>请勿依据过于强烈的主观感受进行评价，禁止恶意投票、拉票等违规行为</strong>，一经发现将采取相应措施。</p>
        </TabPane>
        <TabPane tab="各时段音乐要求" key="requirements">
          <p>上传时请根据歌曲特征推荐播放时段，投票时请参考歌曲所在时段的音乐要求进行评价。</p>

          <ol>
            <li>起床音乐：能使人逐渐清醒，最重要的是最好不要有催眠效果。</li>
            <li>早出门音乐：一定要能使同学们清醒！</li>
            <li>午出门音乐：能提醒午睡的同学及时起床，同时不要给在班上的同学带来太大噪音。</li>
          </ol>
        </TabPane>
      </Tabs>
  );
};
export default Index;
