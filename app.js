// Generated by CoffeeScript 1.9.0
(function() {
  $(function() {
    var Memory;
    Memory = {
      data: {
        totalColors: 11,
        totalShownColors: 4,
        showDuration: 2000,
        preparationTime: 3000,
        username: "TiSiSiRe",
        secondsLeft: 3,
        points: 0,
        startClick: 0,
        stats: {}
      },
      updateStats: function() {
        if (this.data.stats.wins >= 9999) {
          setTarget({
            storage: true
          });
        }
        return $("#stats").html("<h3>" + this.data.username + "</h3><p>Wins: " + this.data.stats.wins + "</p><p>Loses: " + this.data.stats.loses + "</p><p>Total Points Collected: " + this.data.stats.pts + "</p>");
      },
      finishGame: function(action) {
        if (action === "win") {
          if (this.data.totalShownColors === 9) {
            setTarget({
              extreme: true
            });
          }
          ++this.data.stats.wins;
          this.addAlert("Congrats. You won");
        } else if (action === "lose") {
          ++this.data.stats.loses;
          this.addAlert("Oops. You did not make it...");
        }
        this.data.stats.pts += this.data.points;
        localStorage[this.data.username] = JSON.stringify(this.data.stats);
        return this.updateStats();
      },
      points: function(action) {
        var points;
        if (action === "add") {
          points = ++this.data.points;
        }
        if (action === "deduce") {
          points = --this.data.points;
        }
        if (points >= this.data.totalShownColors) {
          this.finishGame('win');
        } else if ($(".color.inactive").length <= 0) {
          this.finishGame("lose");
        }
        return this.updateStats();
      },
      addListeners: function() {
        if ($(".color.inactive").length >= Memory.data.totalShownColors) {
          return $(".color").click(function() {
            var boxNumber, color, correctColor, el, numbers, _i, _ref;
            el = $(this);
            $(".color-picker").html("");
            numbers = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eight', 'ninth', 'tenth', 'eleventh', 'twelve', 'thirteen', 'fourteen', 'fifteen'];
            boxNumber = numbers[el.index()];
            $(".position").text(boxNumber);
            correctColor = parseInt($(this).attr("class").replace(/[^0-9]/g, ""), 10);
            for (color = _i = 0, _ref = Memory.data.totalColors; 0 <= _ref ? _i <= _ref : _i >= _ref; color = 0 <= _ref ? ++_i : --_i) {
              $(".color-picker").append("<div class='color color-" + color + " color-thumbnail'></div>");
            }
            $(".color-picker .color-thumbnail").click(function() {
              el.removeClass("inactive");
              $(".modal").hide("slow");
              if ($(this).hasClass("color-" + correctColor)) {
                Memory.addAlert("You guessed the right color!");
                return Memory.points('add');
              } else {
                Memory.addAlert("You did not guess the right color!");
                return Memory.points("deduce");
              }
            });
            return $(".modal").show('slow');
          });
        }
      },
      addAlert: function(message) {
        $("#alerts").html("<p> " + message + "</p>");
        $("#alerts").show("slow");
        return $("body").animate({
          scrollTop: $("#alerts").offset().height
        }, 'slow');
      },
      setDifficulty: function(difficulty) {
        if (difficulty === 'easy') {
          this.data.totalShownColors = 3;
          this.data.showDuration = 4000;
        }
        if (difficulty === "medium") {
          this.data.totalShownColors = 4;
          this.data.showDuration = 3500;
        }
        if (difficulty === "hard") {
          this.data.totalShownColors = 5;
          this.data.showDuration = 3000;
        }
        if (difficulty === "extreme") {
          this.data.totalShownColors = 9;
          return this.data.showDuration = 500;
        }
      },
      initialize: function() {
        var color, shownColor, _i, _ref;
        this.data.points = 0;
        $("#game").html("");
        this.data.secondsLeft = 3;
        this.data.stats = localStorage[this.data.username] || {
          wins: 0,
          loses: 0,
          pts: 0
        };
        if (typeof this.data.stats === "string") {
          this.data.stats = JSON.parse(localStorage[this.data.username]);
        }
        this.setDifficulty($("#difficulty").find(":selected").text().toLowerCase());
        for (shownColor = _i = 1, _ref = this.data.totalShownColors; 1 <= _ref ? _i <= _ref : _i >= _ref; shownColor = 1 <= _ref ? ++_i : --_i) {
          color = Math.floor(Math.random() * this.data.totalColors);
          $("<div class='color color-" + color + "'>").appendTo("#game");
        }
        this.updateStats();
        return setTimeout(this.hideColors, this.data.showDuration);
      },
      prepareForGame: function() {
        $("#preparation").fadeIn("slow");
        if (Memory.data.secondsLeft === -1) {
          Memory.initialize();
          clearInterval(Memory.data.interval);
          $("#preparation").fadeOut("slow");
        } else {
          $("#preparation").text(Memory.data.secondsLeft);
        }
        return --Memory.data.secondsLeft;
      },
      hideColors: function() {
        $(".color").addClass("inactive");
        return Memory.addListeners();
      }
    };
    $("#start").click(function() {
      if (new Date().getTime() > Memory.data.startClick + 1000 * 15 && started !== true) {
        var started = true;
        if ($(".color.inactive").length <= 0) {
          Memory.data.startClick = new Date().getTime();
          started = false;
          return Memory.data.interval = setInterval(Memory.prepareForGame, Memory.data.preparationTime / 3);
        }
      }
    });
    return Memory.data.username = prompt("Enter your nickname") || Memory.data.username;
  });

}).call(this);

