<!DOCTYPE html>
<html>
<head>
    <title>Redux basic example</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css"
          integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossorigin="anonymous">
    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"
            integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN"
            crossorigin="anonymous"></script>
    <link rel="stylesheet" href="<?php echo base_url(); ?>css/simple.css"></link>

    <style>
        a, a:focus, a:hover {
            color: #fff;
        }

        .btn-secondary, .btn-secondary:hover, .btn-secondary:focus {
            color: #333;
            text-shadow: none; /* Prevent inheritance from `body` */
            background-color: #fff;
            border: .05rem solid #fff;
        }

        html,
        body {
            height: 100%;
            background-color: #333;
        }

        body {
            display: -ms-flexbox;
            display: -webkit-box;
            display: flex;
            -ms-flex-pack: center;
            -webkit-box-pack: center;
            justify-content: center;
            color: #fff;
            text-shadow: 0 .05rem .1rem rgba(0, 0, 0, .5);
            box-shadow: inset 0 0 5rem rgba(0, 0, 0, .5);
        }

        .cover-container {
            max-width: 50em;
        }

        .masthead {
            margin-bottom: 2rem;
        }

        .masthead-brand {
            margin-bottom: 0;
        }

        .nav-masthead .nav-link {
            padding: .25rem 0;
            font-weight: 700;
            color: rgba(255, 255, 255, .5);
            background-color: transparent;
            border-bottom: .25rem solid transparent;
        }

        .nav-masthead .nav-link:hover,
        .nav-masthead .nav-link:focus {
            border-bottom-color: rgba(255, 255, 255, .25);
        }

        .nav-masthead .nav-link + .nav-link {
            margin-left: 1rem;
        }

        .nav-masthead .active {
            color: #fff;
            border-bottom-color: #fff;
        }

        @media (min-width: 48em) {
            .masthead-brand {
                float: left;
            }

            .nav-masthead {
                float: right;
            }
        }

        .cover {
            padding: 0 1.5rem;
        }

        .cover .btn-lg {
            padding: .75rem 1.25rem;
            font-weight: 700;
        }

        .mastfoot {
            color: rgba(255, 255, 255, .5);
        }

    </style>
</head>
<body class="text-center">

<div class="cover-container d-flex h-100 p-3 mx-auto flex-column w-100">
    <header class="masthead">
        <div class="inner">
            <h3 class="masthead-brand">Pusher Example</h3>
            <nav class="nav nav-masthead justify-content-center">
                <a class="nav-link active" href="#">Home</a>
                <a class="nav-link" href="#">Features</a>
                <a class="nav-link" href="#">Contact</a>
            </nav>
        </div>
    </header>

    <main role="main" class="inner cover d-flex flex-column">
        <div class="card container bg-success" style="padding: 1rem;">
            <div class="card-title">
                <span class="col"> Assume authentication is taken care of.</span>

            </div>
            <div class="card-body simple-grid simple-grid-cols-3 simple-grid-rows-2">

                <div id="channelDropdown" class="dropdown col">
                    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton"
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Channel Type
                    </button>
                    <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
                        <a class="dropdown-item" data-value="1" href="#">Public Channel</a>
                        <a class="dropdown-item" data-value="2" href="#">Private Channel</a>
                        <a class="dropdown-item" data-value="3" href="#">Presence Channel</a>
                        <a class="dropdown-item" data-value="4" href="#">Encrypted Channel</a>

                    </div>
                </div>
                <input type="text" class="d-block form-control col" id="createChannelName" placeholder="Channel Name">
                <button class="btn btn-secondary col" id="makeNewChannel">Make New Channel</button>

                <input type="text" class="d-block form-control col" id="authToken" placeholder="Simulating Auth Token">

                <input type="text" class="d-block form-control col" id="connectToChannelName" placeholder="Go to Channel">
                <button class="btn btn-secondary col" id="connectToChannel">Connect Channel</button>
            </div>
        </div>
        <div class="container d-flex flex-row align-items-center justify-content-center h-100 w-100 mt-4">

            <div id="buttons" class="d-flex flex-column w-50" style="gap: 1rem;">
                <input class="btn btn-light d-block w-75 text-wrap" id="initializePusher" type="button"
                       value="Initialize Pusher">

                <input class="btn btn-warning d-block w-75 text-wrap" id="generateTestEvent" type="button"
                       value="Ping Server and Produce Channel Event">

                <input class="btn btn-warning d-block w-75 text-wrap" id="makeEntry" type="button" value="Get Staff Id">

                <input class="btn btn-danger d-block w-75 text-wrap" id="kickMeOut" type="button" data-toggle="modal"
                       data-target="#sPromptsCToQuitModal" value="Kick Me Out">
            </div>

            <div class="card bg-dark d-flex flex-column border border-light ml-1 h-100 w-100" style="width: 30rem;">
                <h1 class="card-title">Output</h1>
                <div class="card-body d-flex">
                    <div>Session Token: <span id="sessionToken"></span></div>
                    <div id="sessionToken"></div>
                    <ul id="output">

                    </ul>
                </div>
            </div>

            <div id="sPromptsCToQuitModal" class="modal fade" role="dialog" aria-labelledby="sPromptsCToQuitModalLabel"
                 aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="sPromptsCToQuitModalLabel">Notice</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                                        aria-hidden="true">×</span></button>
                        </div>
                        <div class="modal-body">
                            Another user is attempting to use this page.
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-success">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>


        </div>

    </main>
    <footer class="mastfoot mt-auto">
        <div class="inner">
            <p>Cover template for <a href="https://getbootstrap.com/">Bootstrap</a>, by <a
                        href="https://twitter.com/mdo">@mdo</a>.</p>
        </div>
    </footer>
</div>


<!-- Bootstrap core JavaScript
================================================== -->
<!-- Placed at the end of the document so the pages load faster -->

<script type="module" src="<?php echo base_url(); ?>dist/bundle.js"></script>
</body>
</html>
