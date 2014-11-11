<?php
// Mimetype: text/vcard
// Charset: UTF-8

class GenerateICal {

    // iCal spec version.
    private $version;
    private $prodid;

    private $uid;
    private $summary;
    private $url;
    private $description;
    private $dateStart;
    private $dateEnd;
    private $dateStamp;

    private $vCard;

    function __construct() {
//        echo "__construct()<br>";

        $this->version      = "2.0";
        $this->prodid       = "-//Ceros Events v1.0//EN";

        $this->summary      = base64_decode($_GET['title']);
        $this->url          = base64_decode($_GET['url']);

        $this->description  = base64_decode($_GET['description']);
        // YYYY-MM-DDTHH:MM:SSZ
        $this->dateStart    = base64_decode($_GET['starttime']);
        $this->dateEnd      = base64_decode($_GET['endtime']);

        $this->dateStamp    = $this->dateToCal(time());
        $this->uid          = uniqid();
        $this->generate();
    }

    function dateToCal($timestamp) {
        return date('Ymd\THis\Z', $timestamp);
    }
    function addLine($text) {
        $text = $text . "\r\n";
        return $text;
    }

    function generate() {
        $this->vCard  = $this->addLine("BEGIN:VCALENDAR");
        $this->vCard .= $this->addLine("VERSION:"       . $this->version);
        $this->vCard .= $this->addLine("PRODID:"        . $this->prodid);
        $this->vCard .= $this->addLine("BEGIN:VEVENT");
        $this->vCard .= $this->addLine("SUMMARY:"       . $this->summary);
        $this->vCard .= $this->addLine("DESCRIPTION:"   . $this->description);
        $this->vCard .= $this->addLine("DTSTART:"       . $this->dateStart);
        $this->vCard .= $this->addLine("DTEND:"         . $this->dateEnd);
        $this->vCard .= $this->addLine("LOCATION:"      . $this->url);
        $this->vCard .= $this->addLine("DTSTAMP:"       . $this->dateStamp);
        $this->vCard .= $this->addLine("UID:"           . $this->uid);
        $this->vCard .= $this->addLine("END:VEVENT");
        $this->vCard .= "END:VCALENDAR";

        header('Content-type: text/calendar; charset=utf-8');
        header('Content-Disposition: attachment; filename="ceros-event.ics"');
//        echo "<pre>";
        echo $this->vCard;
//        echo "<pre>";
    }
}

new GenerateICal();