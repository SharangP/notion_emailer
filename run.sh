if [[ -z "${NOTION_API_KEY}" ]]; then
  echo "please set NOTION_API_KEY"
else
  npm install
  NOTION_ENVIRONMENT=dev node index.cjs
fi
