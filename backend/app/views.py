from app import app
import xml.etree.ElementTree as ET
import urllib.request
import Algorithmia
import re
import requests
import json
import html

@app.route('/<videoId>', methods=["POST"])
def summary(videoId):
    tree = ET.ElementTree(ET.fromstring(downloadXml(videoId)))
    fulltext = ''
    for text in tree.iter('text'):
        try:
            fulltext = fulltext + text.text + " "
        except:
            print('error')

    summary = summarizer(fulltext.replace("\n", " ").strip())
    return summary

@app.route('/<videoId>/<wordLength>', methods=["POST"])
def summary2(videoId, wordLength):
    tree = ET.ElementTree(ET.fromstring(downloadXml(videoId)))
    fulltext = ''
    for text in tree.iter('text'):
        try:
            fulltext = fulltext + text.text + " "
        except:
            print('error')

    summary = summarizer2(fulltext.replace("\n", " ").strip(), wordLength)
    return summary

def downloadXml(videoId):
    url = 'http://video.google.com/timedtext?lang=en&v=' + videoId
    response = urllib.request.urlopen(url)
    xml = response.read().decode('utf-8')
    return xml

# def summarizer(fulltext):
#     return fulltext

def summarizer(fullText):
    input = fullText.replace(".", ". ").replace("!", "! ") #parsed input from xml file
    summaryLength = round(fullText.count('.') * .15)
    summaryJson = requests.post('http://api.smmry.com/&SM_API_KEY=14CF8F8489&SM_LENGTH=' + str(summaryLength), data = {'sm_api_input': html.unescape(input)}).text
    summary = json.loads(summaryJson)
    print("API Calls Remaining: " + summary['sm_api_limitation'])
    return summary['sm_api_content']

def summarizer2(fullText, summaryLength):
    input = fullText.replace(".", ". ").replace("!", "! ") #parsed input from xml file
    summaryJson = requests.post('http://api.smmry.com/&SM_API_KEY=14CF8F8489&SM_LENGTH=' + summaryLength, data = {'sm_api_input': html.unescape(input)}).text
    summary = json.loads(summaryJson)
    print("API Calls Remaining: " + summary['sm_api_limitation'])
    return summary['sm_api_content']
