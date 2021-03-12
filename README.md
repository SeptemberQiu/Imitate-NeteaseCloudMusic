# 一、说明

使用React仿网页端网易云音乐。

后端接口调用自：[NeteaseCloudMusicApi](https://github.com/Binaryify/NeteaseCloudMusicApi)

# 二、功能说明

## （一）底部播放条

### 【1】参考文章

1. **第一版底部播放器**

- [《react 实现可播放的进度条》](https://blog.csdn.net/sinat_39626276/article/details/81034385)
- [《H5 <audio> 音频标签自定义样式修改以及添加播放控制事件》](https://www.cnblogs.com/Mr5GG/p/9076699.html)

2. **第二版底部播放器**

- [《JS数组对象去重》](https://blog.csdn.net/zsm4623/article/details/105469565)
- [《Audio 对象属性》](https://www.w3school.com.cn/jsref/dom_obj_audio.asp)

3. **第三版底部播放器**

- [《基于React的音乐播放器【仿网易云音乐web】》](https://juejin.cn/post/6844903757474430990)

- 上一条的项目Github地址：**[react-music-play-component](https://github.com/willluck/react-music-play-component)**

- [《HTML DOM事件》](https://www.runoob.com/jsref/dom-obj-event.html)

- ***补充：***

  ```
  但第三版参考的这篇文章，会出现一个BUG，和一个使用上的不足之处：
  BUG：如果按住按钮拖动时，把鼠标左键按住拖出播放器范围，再松开，会发生鼠标移入进度条，可以随意滑动（不需要按压）进度条。解决方法是：增加 onMouseLeave 方法
  优化：按住按钮拖动中，可以选中周围的文字，关于此问题参考自下条文章
  ```

- [《H5 <audio>音频标签自定义样式修改以及添加播放控制事件》](https://www.cnblogs.com/Mr5GG/p/9076699.html)

### 【2】实现功能

第一版完成功能：

1. 播放条样式实现；
2. 使用写定的一首歌。

第二版完成功能：

1. 点击歌曲列表中任意一首歌的播放按钮进行播放；实现了展示歌曲图、歌手；
2. 点击首页某条歌曲“添加到播放列表”按钮，实现添加歌曲信息到“播放列表”；
3. 点击底部播放条右侧“播放列表”展开播放列表中左侧`已添加歌曲列表`，完成点击对应歌曲实现播放；
4. 清除歌曲列表功能；
5. 增加样式、部分样式和逻辑的优化。

第三版完成功能：

1. 点击播放时，把歌曲信息推入到播放列表中；

2. 监听播放完成时，重新播放（暂时只能单曲）；

3. 进度条点击和拖动，优化使用；

   ```
   优化使用中，在第三版参考文章中第一条文章，提供了一个优化点：
   
   “正常的拖拽，我们的鼠标难免会有可能偏移到进度条以外，因为进度条的长宽都是确定的，并没有覆盖到可能会产生的偏移区域，所以如果把所有拖拽时间都放到进度条上，如果鼠标产生了这种偏移，就会发生失去响应的情况。。。。。。所以我的进度条上小圆点只有onMouseDown一个方法，同时在最外层整个播放器div上放了onMouseMove和onMouseUp两个事件。。。。。。”
   
   在我的代码中：
   在包裹播放条的最外层div上添加了onMouseMove、onMouseUp、onMouseLeave三个事件。在圆点上只放了一个onMouseDown事件。
   ```

   


# 四、开始

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
