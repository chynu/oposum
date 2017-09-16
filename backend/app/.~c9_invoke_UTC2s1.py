from app import app
import xml.etree.ElementTree as ET
import urllib.request
import Algorithmia
import re

@app.route('/<videoid>', methods=["POST"])
def index(videoid):
    tree = ET.ElementTree(ET.fromstring(downloadXml(videoid)))
    fulltext = ''
    for text in tree.iter('text'):
        fulltext = fulltext + text.text
    summary = summarizer(fulltext.replace("\n", " ").strip())
    return summary

def downloadXml(videoid):
    url = 'http://video.google.com/timedtext?lang=en&v=' + videoid
    response = urllib.request.urlopen(url)
    xml = response.read().decode('utf-8')
    return xml

# def summarizer(fulltext):
#     return fulltext

def summarizer(fulltext):
    inputz = re.sub(".", ". ", fulltext) #parsed input from xml file
    client = Algorithmia.client('simyOe+pa4UiSIHxCnl8NPww3p/1')
    algo = client.algo('nlp/Summarizer/0.1.6')
    return algo.pipe(inputz).result

# Visit: http://edusearch-eleng555.c9users.io/
# Press F12 (open developer tools)
# In chrome console, enter: 
# fetch("/3QhU9jd03a0", {
#   method: "POST"
# }).then((response) => {
# 	return response.text();
# }).then((response) => {
# 	console.log(response);
# });