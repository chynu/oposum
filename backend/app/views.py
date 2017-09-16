from app import app
import xml.etree.ElementTree as ET
import urllib.request
import Algorithmia
import re
import requests
import json
import html

@app.route('/<videoid>', methods=["POST"])
def index(videoid):
    tree = ET.ElementTree(ET.fromstring(downloadXml(videoid)))
    fulltext = ''
    for text in tree.iter('text'):
        fulltext = fulltext + text.text + " "
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
    input = fulltext.replace(".", ". ").replace("!", "! ") #parsed input from xml file
    summaryLength = round(fulltext.count('.') * .15)
    summaryJson = requests.post('http://api.smmry.com/&SM_API_KEY=14CF8F8489&SM_LENGTH=' + str(summaryLength), data = {'sm_api_input': html.unescape(input)}).text
    summary = json.loads(summaryJson)
    print("API Calls Remaining: " + summary['sm_api_limitation'])
    return summary['sm_api_content']