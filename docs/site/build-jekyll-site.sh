#git clone git@github.com:whatever .
echo "=== check for index.md file"
if [ -e ./docs/index.md ]
then
    echo "found index.md file"
else
    echo "This process requires at leaset an docs/index.md file"
    exit 1
fi
echo "=== copy docs to _tabs ==="
mv ./docs/index.md ./index.md
cp -r ./docs/. ./_tabs
cd ./docs
echo "=== added post dates to the docs files ==="
ls | xargs -I {} mv {} 2023-2-2-{}
cd ..
echo "=== copying the post files (with dates) to _posts ==="
cp -r ./docs/. ./_posts
