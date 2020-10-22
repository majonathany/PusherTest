<?php

defined('BASEPATH') or exit('No direct script access allowed');

class App_pusher
{
    private $pusher;

    private $app_key = '';

    private $app_secret = '';

    private $app_id = '';

    private $pusher_options = [];

    public function __construct()
    {
        $this->CI = get_instance();

        $this->app_key = $this->CI->config->item('pusher_app_key');
        $this->app_secret = $this->CI->config->item('pusher_app_secret');
        $this->app_id = $this->CI->config->item('pusher_app_id');
        $this->pusher_options = array('cluster' => $this->CI->config->item('cluster'),
            'useTLS' => $this->CI->config->item('useTLS'));


        $this->initialize();
    }

    private function initialize()
    {
        try
        {
            if ($this->app_key !== '' && $this->app_secret !== '' && $this->app_secret !== '') {
                $this->pusher = new Pusher\Pusher(
                    $this->app_key,
                    $this->app_secret,
                    $this->app_id,
                    $this->pusher_options
                );
            }
        }
        catch (Exception $e)
        {
            echo "Could not load pusher. Check credentials: " + $e;
        }
    }

    public function __call($name, $arguments)
    {
        if (method_exists($this->pusher, $name)) {
            return $this->pusher->{$name}(...$arguments);
        }

        // In case Pusher keys are not set
        if ($this->pusher) {
            throw new \BadMethodCallException('Instance method Pusher->$name() doesn\'t exist');
        }
    }
}
