
母專案 -- https://github.com/se-test-examples-2-7/git-examples/tree/main  
分支 -- https://github.com/se-test-examples-2-7/git-examples/tree/developGitBranch  
子專案 -- https://github.com/yuan22777/git-examples/tree/main   


### 母專案
```bash
# 建立新分支並切換過去
git checkout -b developGitBranch

#把所有 .md 檔案加入到暫存區
git add *.md

#提交
git commit -m "add gitBranch.md"

#把 developGitBranch 分支推送到遠端倉庫 origin
git push origin developGitBranch

#切回主分支
git checkout main

#把 developGitBranch 的修改合併到 main 分支
git merge developGitBranch

#把更新後的 main 分支推送到遠端倉庫。
git push origin main
```

### 子專案
```bash
#從GitHub上面clone下來
git clone git@github.com:yuan22777/git-examples.git

#把所有修改過的檔案加入到暫存區
git add -A

#提交
git commit -m "add test"

#push上GitHub
git push
```
