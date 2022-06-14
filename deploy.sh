file_name=webscrape-spotify-project
current_time=$(date "+%d.%m.%Y-%H.%M.%S")
new_fileName=$file_name.$current_time.zip
zip -r $new_fileName

aws s3 cp $new_fileName s3://webscrape-spotify-bucket
                             webscrape-spotify-bucket
aws cloudformation update-stack --stack-name webscrape-spotify-stack --template-body file://~/Users/Stuart/OneDrive/AWS/spotify-webscraper/lambda_cloud_formation_template.yaml --parameters ParameterKey=new_fileName,ParameterValue=$new_fileName
