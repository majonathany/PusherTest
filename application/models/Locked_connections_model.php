<?php

defined('BASEPATH') or exit('No direct script access allowed');


class Locked_connections_model extends CI_Model
{
    public function __construct()
    {
        parent::__construct();

        $this->load->database();
        $this->load->helper('url');
        $this->load->library('App_pusher');
        $this->load->model('locked_connections_model');

    }

    public function fetchStaffId()
    {
        $this->db->from(db_prefix() . "staff");
        $this->db->select('staffid');
        $this->db->limit(1);
        $query = $this->db->get();
        return ['staffid' => $query->result()[0]->staffid];
    }

    public function fetchProjTempVerId()
    {
        $this->db->from(db_prefix() . "project_template_versions");
        $this->db->select('*');
        $this->db->limit(1);
        $query = $this->db->get();
        return ['id' => $query->result()[0]];

    }

    public function testDB()
    {
        $this->db->trans_start();
        $this->db->flush_cache();
        $this->db->from(db_prefix() . "staff");
        $this->db->select('*');
        $query = $this->db->get();

        if ($this->db->trans_complete())
        {
            return $query->result;
        }
        else
        {
            return null;
        }
    }

    //TODO
    public function kickout(Array $inConnection, Array $outConnection): bool
    {
        $this->db->trans_start();
        $this->db->flush_cache();
        $this->db->from($this->db_prefix() . "users");
        $this->db->select('*');
        $query = $this->db->get();

        if ($this->db->trans_complete())
        {
            return $this->output
                ->set_content_type('application/json')
                ->set_status_header(200)
                ->set_output(json_encode($query->result()));
        }
        else
        {
            return $this->output
                ->set_content_type('application/json')
                ->set_status_header(400)
                ->set_output(json_encode("Failure"));

        }
    }

    //TODO
    public function get_connection_status(): Array
    {

    }

}