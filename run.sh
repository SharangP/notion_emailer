if [[ -z "${NOTION_API_KEY}" ]]; then
  npm install
  node index.cjs
else
echo "please set NOTION_API_KEY"
