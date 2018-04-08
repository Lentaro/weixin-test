import {list} from '../../../data/post-data'

Page({
    onLoad: function (option) {
        // console.log(option)
        let postId = option.id
        this.data.currentPostId = postId;
        // console.log(postId)
        let postData = list.postList[postId]
        // console.log(postData)
        this.setData({...postData})

        let postsCollected = wx.getStorageSync('postsCollected')
        if(postsCollected) {
            let collected = postsCollected[postId]
            // console.log(collected)
            this.setData({
                collected
            })
        }else {
            let postsCollected = {}
            postsCollected[postId] = false
            wx.setStorageSync('postsCollected',postsCollected)
        }
    },

    onCollectionTap () {
        let postsCollected = wx.getStorageSync('postsCollected')
        let collected = postsCollected[this.data.currentPostId]
        collected = !collected;
        // console.log(postsCollected)
        postsCollected[this.data.currentPostId] = collected
        this.showModal(postsCollected,collected)
    },
    showModal (postsCollected,collected) {
        let _this = this
        wx.showModal({
            title:"收藏",
            content:collected?"收藏该文章？":"是否取消收藏该文章？",
            showCancel:"true",
            cancelColor:"#333",
            confirmText:"确认",
            confirmColor:"#405f80",
            success:(res)=>{
                if (res.confirm) {
                    wx.setStorageSync('postsCollected',postsCollected);
                    // console.log(collected)
                    _this.setData({
                        collected
                    })
                }
            }
        })
    },
    showToast (postsCollected,collected) {
        wx.setStorageSync('postsCollected',postsCollected);
        // console.log(collected)
        this.setData({
            collected
        })
        wx.showToast({
            title:collected?"收藏成功":"取消成功",
            duration:1000
        })
    }
})