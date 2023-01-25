export const gitLogCommand = (dir,authors) => `cd ${dir} && git log ${authors.map(author => `--author="${author}"`).join(" ")} --pretty="%an <%ae> %ct"`
