if [[ -z "${NOTION_API_KEY}" ]]; then
  echo "please set NOTION_API_KEY"
else
  export NOTION_ENVIRONMENT=dev
  npm install
  node index.cjs
fi
