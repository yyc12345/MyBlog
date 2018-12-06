# gitbook-plugin-bilibili

## 项目地址

* [Original Repository](https://github.com/open-course/gitbook-plugin-bilibili)
* [My fork repository](https://github.com/yyc12345/gitbook-plugin-bilibili)
* [Gitbook plugin page](https://plugins.gitbook.com/plugin/bilibili)
* [NPM page](https://www.npmjs.com/package/gitbook-plugin-bilibili)

## 贡献过程

在我尝试用Gitbook写[ballance-wiki](../ballance-wiki.md)的那段时间，我一直在找一种能在Gitbook内插入视频的Gitbook plugin，翻了很久，都是写Youtube之类的实现，最后终于发现了这个插件，拉下来一用，发现是HTTP + Flash + 不能用的状况，然后我爬到对应的Github页面，自我感觉这个Repo可能早已Outdated了。

当时B站已经有HTTPS + flv.js播放器了，然后我fork下这个项目打算改改。我先是把所有资源改成HTTPS的了，然后，当时我还没任何JavaScript的经验，只能从头摸索。说这个Repo是我JavaScript的启蒙一点不为过。

改后发现还不能用，于是决定加参数，上flv.js播放器（用的B站的API，并不是直接上了flv.js），上了之后能用了，于是我最后审查了一下，交了Pull Request。说原来的不能用了，我加了HTTPS和flv.js播放器，原来的播放器给您留着，没改。

很有趣的是，这个项目的修改是在我**高考**前一个星期的时候才开始搞的，Pull Request交的日期正是高考前一天。

由于当时对ballance-wiki的需求不止添加bilibili的视频，再加上这个Repo的Host在1个月后才Merge了我的Pr，我等不了那么久，还有我不想把一些对我很重要但对于此插件并不重要的特性放在Pr里。于是高考后花了3星期的时间创造了[gitbook-plugin-chinese-video](../programming/gitbook-plugin-chinese-video.md)并立即引用到ballance-wiki里了。可以说，这个项目直接导致了gitbook-plugin-chinese-video的产生，并且厚颜无耻的事情是，我在创造gitbook-plugin-chinese-video的时候是直接将此Repo的大部分代码直接Copy过去然后魔改了一大堆特性了的。。。![cannotlook](../assets/emoji/cannotlook.jpg)