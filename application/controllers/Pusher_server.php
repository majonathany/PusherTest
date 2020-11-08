<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require __DIR__ . '/../../vendor/autoload.php';


class Pusher_Server extends CI_Controller {
    /**
     * @var Pusher
     */
    public $pusher;
    public $app_pusher;

    private function db_prefix()
    {
        return '';
    }

    public function __construct()
    {
        parent::__construct();// you have missed this line.\

        $this->load->database();
        $this->load->helper('url');
        $this->load->library('App_pusher');
        $this->load->model('locked_connections_model');

    }

    public function produceJSON200Response($results)
    {
        return $this->output
            ->set_content_type('application/json')
            ->set_status_header(200)
            ->set_output(json_encode($results));
    }

    public function produceJSON400Response($error)
    {
        return $this->output
            ->set_content_type('application/json')
            ->set_status_header(400)
            ->set_output($error ? json_encode($error) : "Failure");
    }

    //Can only accept either JSON array or null, and
    //produces response based on that.
    public function produceJSONFromArray($results)
    {
        if (!is_array($results) && !is_null($results))
        {
            $results = [$results];
        }
        return $results != null ?
            $this->produceJSON200Response($results) :
            $this->produceJSON400Response('');
    }

    public function generateTestEvent()
    {
        $request = json_decode($this->input->raw_input_stream, true);

        $channel = $request["channel"];
        $event = $request["event"];

        $data['message'] = rand(1, 1000);
        $response = $this->app_pusher->trigger($channel, $event, $data);
        return $response ? $this->produceJSON200Response(["success" => true]) :
            $this->produceJSON400Response(["success" => false]);
    }

    public function getJSONFromRequest()
    {
        return json_decode($this->input->raw_input_stream, true);
    }


    /**
     * Fetch Staff ID based on current session. Should only be called if user is logged in, otherwise return 400.
     *
     * @return \PHPUnit\Util\Json with form: {staff_id: n}
     */

    public function fetchAppKey()
    {
        return $this->produceJSONFromArray(
            [$this->app_pusher->getAppKey()]
        );
    }

    public function fetchStaffId()
    {
        return $this->produceJSONFromArray(
            $this->locked_connections_model->fetchStaffId());
    }

    public function fetchProjTempVerId()
    {
        return $this->produceJSONFromArray(
            $this->locked_connections_model->fetchProjTempVerId());

    }

	public function index()
	{
		$this->load->view('pusher_example');
	}

    // Returns {auth: "", sharedSecret: ""} for encrypted channels.
	public function auth()
    {
        $authToken = $this->input->post('authToken');
        $socketId = $this->input->post('socket_id');
        $channelName = $this->input->post('channel_name');

//        if ($authToken == 'correct')
        if (true)
        {
            $authObject = $this->getAuthJSON($authToken, $socketId, $channelName);
            return $this->produceJSONFromArray($authObject);
        }
        else
        {
            return $this->produceJSONFromArray('bad token');
        }
    }

    public function getAuthJSON(string $authToken, string $socketId, string $channelName)
    {
        $key = $this->app_pusher->getAppKey();
        $secret = $this->app_pusher->getAppSecret();

        return $this->app_pusher->socket_auth(
            $channelName, $socketId, "{\"authToken\": \"$authToken\" }"
        );
    }

    // Tell server to generate a unique identifier
    public function create()
    {
        $authToken = $this->getJSONFromRequest()['authToken'];
        $channelName = $this->getJSONFromRequest()['channelName'];
        if ($authToken == 'correct')
        {
            return $this->produceJSONFromArray(['response' => $authToken.$channelName]);
        }
        else
        {
            return $this->produceJSONFromArray('bad token');
        }
    }

    public function connect()
    {
        $authToken = $this->getJSONFromRequest()['authToken'];
        $channelName = $this->getJSONFromRequest()['channelName'];

        if ($authToken == 'correct')
        {
            return $this->produceJSONFromArray(['response' => $authToken.$channelName]);
        }
        else
        {
            return $this->produceJSONFromArray('bad token');
        }
    }

    //Trigger event to channel.
    public function receiveMessage(){}
}
