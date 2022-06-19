$file_name="webscrapeSpotifyProject"
$current_time = (Get-Date).ToString("dd-MM-yyyy_HH-mm-ss")
$new_fileName=$file_name +"_"+ $current_time +".zip"
New-Item -Path . -Name $new_fileName  -ItemType "file" 
Compress-Archive -Path C:\Users\Stuart\OneDrive\AWS\spotify-webscraper\* -DestinationPath C:\Users\Stuart\OneDrive\AWS\spotify-webscraper\$new_fileName -Force