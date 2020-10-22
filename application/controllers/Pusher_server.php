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

    public function produceJSON400Response()
    {
        return $this->output
            ->set_content_type('application/json')
            ->set_status_header(400)
            ->set_output('Failure');
    }

    //Can only accept either JSON array or null, and
    //produces response based on that.
    public function produceJSONFromArray($results)
    {
        return $results != null ?
            $this->produceJSON200Response($results) :
            $this->produceJSON400Response();
    }

    public function generateTestEvent()
    {
        $data['message'] = rand(1, 1000);
        $this->app_pusher->trigger('my-channel', 'my-event', $data);
    }


    /**
     * Fetch Staff ID based on current session. Should only be called if user is logged in, otherwise return 400.
     *
     * @return JSON: {staff_id: n}
     */

    public function fetchStaffId()
    {
        return $this->produceJSONFromArray(
            $this->locked_connections_model->fetchStaffId());
    }

	public function index()
	{
		$this->load->view('pusher_example');
	}
}
