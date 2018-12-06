# gitbook-plugin-chinese-video

## 项目地址

* [Github repository](https://github.com/yyc12345/gitbook-plugin-chinese-video)
* [Gitbook plugin page](https://plugins.gitbook.com/plugin/chinese-video)
* [NPM page](https://www.npmjs.com/package/gitbook-plugin-chinese-video)

## 开发过程

这个工程是受[gitbook-plugin-bilibili](../contribution/gitbook-plugin-bilibili.md)的启发而开始的。同时也是为在[Github上托管的ballance-wiki页面](https://github.com/BearKidsTeam/ballance-wiki)做辅助而用的。

工程是在高考结束之后立马开发的（通过`git log`回忆），由于已经之前已经帮忙了gitbook-plugin-bilibili，这次开发也就直接用gitbook-plugin-bilibili作为基底直接开发了。也算是对JavaScript的一次熟悉吧。

工程开始，只是对原有gitbook-plugin-bilibili的参数进行了大刀阔斧的改革，然后交了tag也是0开头的。后来加入了优酷等一些视频的插入模式，版本号仍然停留在0，因为我不止想要这些。我记得当时找到个网站，介绍了各大视频网站如何插入视频，并且还给出了不同实现，和我这个工程的目的很像（区别仅仅是它没有做gitbook plugin而已）

后来花了几天时间组织了下工程，把相关内容*借鉴*过来之后，打了正式发布的tag，然后我去注册了个npm的账号，学习了如何使用`npm login`和`npm publish`，然后发布了。

之后，ballancebug，HTML CSS JS大佬，指出我的插件在手机上阅读起来非常蛋疼，因为我的长宽是写死的，没能自适应大小。

我想用Pure JS解决这个问题，查阅各种资料，编写了一串能使用事件来随时调整对应视频大小的代码，主要是输入的长宽限制了最大大小，如果屏幕过小，就将长宽按比例缩小。后来使用一个插入语句把我的Script插入到文档里面，最后成功解决问题（虽然可能只在Chrome上表现良好）。

打了1.2的tag，交了上去，然后就没碰过了。
