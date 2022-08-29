cd ~/code/notion_emailer
zip -r ../notion_emailer.zip *
cd ..
aws lambda update-function-code --function-name WeeklyNotionEmail --zip-file fileb://notion_emailer.zip
echo "deploy uploaded code from the lambda console"
