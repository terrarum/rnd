<?php
/**
 * Search parser because yubnub is annoying.
 */


class Parser {
    protected $engines;

    function __construct() {
        $this->engines = array(
            'g'     =>  'https://www.google.com/search?hl=en&tbo=d&output=search&sclient=psy-ab&q=%s&btnG=&oq=&gs_l=&pbx=1',
            'guk'     =>  'https://www.google.co.uk/search?hl=en&tbo=d&output=search&sclient=psy-ab&q=%s&btnG=&oq=&gs_l=&pbx=1',
            'gi'    =>  'https://www.google.com/search?num=10&hl=en&authuser=0&site=imghp&tbm=isch&source=hp&biw=1680&bih=964&q=%s&btnG=Search+by+image&oq=&gs_l=',
            'gpuk'  =>  'http://www.google.co.uk/search?hl=en&tbm=shop&q=%s&oq=&gs_l=',
            'gm'    =>  'http://maps.google.com/maps?q=%s',
            'gmuk'  =>  'http://maps.google.co.uk/maps?q=%s',
            'wi'    =>  'http://www.wikipedia.org/search-redirect.php?family=wikipedia&search=%s&language=en&go=++%E2%86%92++&go=Go',
            'wikt'  =>  'http://www.wikipedia.org/search-redirect.php?family=wiktionary&search=%s&language=en&go=++%E2%86%92++&go=Go',
            'yt'    =>  'http://www.youtube.com/results?search_query=%s&oq=&gs_l=',
            'imdb'  =>  'http://www.imdb.com/find?q=%s&s=all',
            'ud'    =>  'http://www.urbandictionary.com/define.php?term=%s',
            'amuk'  =>  'http://www.amazon.co.uk/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=%s',
            'am'    =>  'http://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=%s'
        );

        if (isset($_GET['command'])) {
            $query = $_GET['command'];
            $this->parse($query);
        }
        else {
            echo "<pre>";
            print_r($this->engines);
            echo "</pre>";
        }
    }

    /*
     * Parses the input.
     */
    function parse($query) {
        # Pulls out the first 'word'.
        $command = strtolower(strstr($query, ' ', true));
        # Pulls out the search term.
        $searchTerm = urlencode(substr(strstr($query," "), 1));

        $this->go($command, $searchTerm);
    }

    function go($command, $searchTerm) {
        # Gets the appropriate URL based on the command.
        if (isset($this->engines[$command])) {
            $url = str_replace("%s", $searchTerm, $this->engines[$command]);
            header("Location: $url");
        }
        else {
            echo "Command <b>$command</b> not found.";
            echo "<hr>";
            echo "<pre>";
            print_r($this->engines);
            echo "</pre>";
        }
    }
}

new Parser();

# localhost/rnd/search/parser.php?command=g hats
# http://trrrm.com/search/parser.php?command=g hats