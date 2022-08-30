cd ~/code/notion_emailer
rm ../notion_emailer.zip
zip -r ../notion_emailer.zip *
cd ..
aws lambda update-function-code --function-name WeeklyNotionEmail --zip-file fileb://notion_emailer.zip
