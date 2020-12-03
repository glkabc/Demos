# git 常用命令

##### 环境配置：

###### 查看配置信息:

```shell
git config --list 
```

###### 初始化本地厂库:

```shell
git init
```

###### 设置用户名及邮件

```shell
git config --global user.name "lkguo"  # 用户名
git config --global user.email "jjj@qq.com" # 用户邮件
```

##### 常用命令：

###### 获取远程仓库:

> 克隆下来的厂库所有信息及版本都克隆下来了

```shell
git clone url(远程厂库地址) 
```

###### 查看厂库文件状态

```shell
git status / git status -s
```

添加到暂存区

```shell
git add 文件名 / git add .
```

提交到本地厂库

```shell
git commit -m '提交描述'
```

删除厂库文件

> 最好在Git Bush 中执行，如果手动删除还需要先添加到暂存区才能提交

```shell
git rm 文件名
git commit -m '提交描述'
```

查看日志记录

> 记录多的话会进入查看模式可以下一页

```shell
git log
```

查看远程厂库

> 默认情况下会有一个 origin名的厂库

```shell
git remote
```

```shell
git remote -v
```

```shell
git remote show 厂库名  # 查看厂库详细信息
```

添加远程厂库

```shell
git remote add origin(厂库名) url(远程厂库地址)
```

移除无效的远程厂库

> 只是移除了与无效远程厂库的联系和本地厂库，远程厂库并没有删除

```shell
git remote rm origin(厂库名)
```

从远程厂库的拉去与抓取

```shell
# git fetch 是从远程厂库获取最新版本到本地厂库，不会自动merge(合并)，需要自己合并
git fetch origin master
git fetch

#合并
git merge origin/master

git pull 相当于以上两个操作的合并
git pull origin master 
git pull origin master --allow-unrelated-histories  # 允许已有文件合并
```

推送到远程厂库

```shell
git push
```

```shell
git commit -a -m "描述" #可以跳过git add
```

git的分支

```shell
# 列出所有本地分支
git branch
# 列出所有远程分支
git branch -r
# 列出所有本地分支和远程分支
git branch -a
```

创建分支

```shell
git branch 分支名
```

切换分支

```shell
git checkout 分支名
```

分支推送

```shell
git push origin 分支名
```

合并分支

```shell
# 要合并到那个里面分支就要在那个进行
git merge 分支名
# 分支冲突的情况下，先修改 -> git add -> git commit
```

删除本地分支

```shell
git branch -d 分支名称  # 如果有开发动作则不会删除
git branch -D 分支名称  # 强制分支
```

删除远程分支

```shell
git push origin -d 远程分支名
```

创建一个标签

```shell
git tag [tagName]
```

查看标签/信息

```shell
git tag / git show [tag]
```

推送标签

```shell
git push [remote] [tag]
```

检出标签

```shell
git checkout -b [branch][tag]
```

删除本地标签

```shell
git tag -d [tag]
```

删除远程标签

```shell
git push origin :refs/tags/[tag]
```

密钥生成

```shell
ssh-keygen-trsa
```

