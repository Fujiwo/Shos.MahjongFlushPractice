"use strict";
/// <reference path="./typings/jquery/jQuery.d.ts"
var Chiniisou;
(function (Chiniisou) {
    var Suit;
    (function (Suit) {
        Suit[Suit["Characters"] = 0] = "Characters";
        Suit[Suit["Bomboos"] = 1] = "Bomboos";
        Suit[Suit["Dots"] = 2] = "Dots";
    })(Suit || (Suit = {}));
    var TileSize;
    (function (TileSize) {
        TileSize[TileSize["Small"] = 0] = "Small";
        TileSize[TileSize["Medium"] = 1] = "Medium";
        TileSize[TileSize["Large"] = 2] = "Large";
    })(TileSize || (TileSize = {}));
    var Helper = /** @class */ (function () {
        function Helper() {
        }
        Helper.getRandomNumber = function (minimum, maximum) {
            return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
        };
        Helper.getRandomIndex = function (number) {
            return Math.floor(Math.random() * number);
        };
        Helper.getRandomElement = function (array) {
            return array[Helper.getRandomIndex(array.length)];
        };
        Helper.shuffle = function (array) {
            for (var count = array.length; count > 1; count--)
                Helper.shuffleTail(array, count);
        };
        Helper.shuffleTail = function (collection, count) {
            var lastIndex = count - 1;
            var randomIndex = Helper.getRandomIndex(count);
            Helper.swap(collection, lastIndex, randomIndex);
        };
        Helper.swap = function (collection, index1, index2) {
            if (index1 == index2)
                return;
            var temporary = collection[index1];
            collection[index1] = collection[index2];
            collection[index2] = temporary;
        };
        return Helper;
    }());
    var Model = /** @class */ (function () {
        function Model() {
            this.allHands = Model.getAllHands();
            this.completeHands = Model.getCompleteHands(this.allHands);
        }
        Model.prototype.getNewReadyToWinHand = function () {
            var completeHand = Helper.getRandomElement(this.completeHands);
            return Model.getReadyToWinHand(completeHand);
        };
        Model.makeComplateHandIndexes = function (readyToWinHand) {
            var handIndexes = [];
            for (var handIndex = 0; handIndex < 9; handIndex++) {
                var hand = Model.appendHand(readyToWinHand, handIndex);
                if (hand !== null && Model.isCompleteHand(hand))
                    handIndexes.push(handIndex);
            }
            return handIndexes;
        };
        Model.shuffledHandIndexes = function (hand) {
            var handIndexes = Model.handToHandIndexes(hand);
            Helper.shuffle(handIndexes);
            return handIndexes;
        };
        Model.handToHandIndexes = function (hand) {
            var handIndexes = [];
            for (var handIndex = 0; handIndex < hand.length; handIndex++) {
                for (var index = 0; index < hand[handIndex]; index++)
                    handIndexes.push(handIndex);
            }
            return handIndexes;
        };
        // private static handIndexesToHand(handIndexes: number[]): number[] {
        //     var hand: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        //     for (var index = 0; index < handIndexes.length; index++)
        //         hand[handIndexes[index]]++;
        //     return hand;
        // }
        Model.getAllHands = function () {
            var hands = [];
            for (var tileNumber1 = 0; tileNumber1 <= 4; tileNumber1++) {
                var tileNumberSum1 = tileNumber1;
                for (var tileNumber2 = 0; tileNumber2 <= 4; tileNumber2++) {
                    var tileNumberSum2 = tileNumberSum1 + tileNumber2;
                    for (var tileNumber3 = 0; tileNumber3 <= 4; tileNumber3++) {
                        var tileNumberSum3 = tileNumberSum2 + tileNumber3;
                        for (var tileNumber4 = 0; tileNumber4 <= 4; tileNumber4++) {
                            var tileNumberSum4 = tileNumberSum3 + tileNumber4;
                            if (tileNumberSum4 >= Model.completeHandsNumber) {
                                if (tileNumberSum4 == Model.completeHandsNumber)
                                    hands.push([tileNumber1, tileNumber2, tileNumber3, tileNumber4, 0, 0, 0, 0, 0]);
                                break;
                            }
                            for (var tileNumber5 = 0; tileNumber5 <= 4; tileNumber5++) {
                                var tileNumberSum5 = tileNumberSum4 + tileNumber5;
                                if (tileNumberSum5 >= Model.completeHandsNumber) {
                                    if (tileNumberSum5 == Model.completeHandsNumber)
                                        hands.push([tileNumber1, tileNumber2, tileNumber3, tileNumber4, tileNumber5, 0, 0, 0, 0]);
                                    break;
                                }
                                for (var tileNumber6 = 0; tileNumber6 <= 4; tileNumber6++) {
                                    var tileNumberSum6 = tileNumberSum5 + tileNumber6;
                                    if (tileNumberSum6 >= Model.completeHandsNumber) {
                                        if (tileNumberSum6 == Model.completeHandsNumber)
                                            hands.push([tileNumber1, tileNumber2, tileNumber3, tileNumber4, tileNumber5, tileNumber6, 0, 0, 0]);
                                        break;
                                    }
                                    for (var tileNumber7 = 0; tileNumber7 <= 4; tileNumber7++) {
                                        var tileNumberSum7 = tileNumberSum6 + tileNumber7;
                                        if (tileNumberSum7 >= Model.completeHandsNumber) {
                                            if (tileNumberSum7 == Model.completeHandsNumber)
                                                hands.push([tileNumber1, tileNumber2, tileNumber3, tileNumber4, tileNumber5, tileNumber6, tileNumber7, 0, 0]);
                                            break;
                                        }
                                        for (var tileNumber8 = 0; tileNumber8 <= 4; tileNumber8++) {
                                            var tileNumberSum8 = tileNumberSum7 + tileNumber8;
                                            if (tileNumberSum8 >= Model.completeHandsNumber) {
                                                if (tileNumberSum8 == Model.completeHandsNumber)
                                                    hands.push([tileNumber1, tileNumber2, tileNumber3, tileNumber4, tileNumber5, tileNumber6, tileNumber7, tileNumber8, 0]);
                                                break;
                                            }
                                            for (var tileNumber9 = 0; tileNumber9 <= 4; tileNumber9++) {
                                                var tileNumberSum9 = tileNumberSum8 + tileNumber9;
                                                if (tileNumberSum9 >= Model.completeHandsNumber) {
                                                    if (tileNumberSum9 == Model.completeHandsNumber)
                                                        hands.push([tileNumber1, tileNumber2, tileNumber3, tileNumber4, tileNumber5, tileNumber6, tileNumber7, tileNumber8, tileNumber9]);
                                                    break;
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            return hands;
        };
        Model.isSevenPairs = function (hand) {
            for (var index = 0; index < hand.length; index++) {
                if (hand[index] != 0 && hand[index] != 2)
                    return false;
            }
            return true;
        };
        Model.maybeCompleteHand = function (hand) {
            var a = hand[0];
            var b = hand[1];
            for (var i = 0; i < 7; i++) {
                var r = a % 3;
                if (b >= r && hand[i + 2] >= r) {
                    a = b - r;
                    b = hand[i + 2] - r;
                }
                else {
                    return false;
                }
            }
            return a % 3 == 0 && b % 3 == 0;
        };
        Model.isCompleteHand = function (hand) {
            if (Model.isSevenPairs(hand))
                return true;
            var p = 0;
            for (var i = 0; i < 9; i++)
                p += i * hand[i];
            for (var i = p * 2 % 3; i < 9; i += 3) {
                hand[i] -= 2;
                if (hand[i] >= 0) {
                    if (Model.maybeCompleteHand(hand)) {
                        hand[i] += 2;
                        return true;
                    }
                }
                hand[i] += 2;
            }
            return false;
        };
        Model.getCompleteHands = function (allHands) {
            return allHands.filter(function (hand) { return Model.isCompleteHand(hand); });
        };
        Model.decrementHand = function (hand) {
            var randomIndex = Helper.getRandomIndex(Model.completeHandsNumber);
            var index = 0;
            for (var handIndex = 0; handIndex < hand.length; handIndex++) {
                index += hand[handIndex];
                if (index > randomIndex) {
                    var clonedHand = hand.concat();
                    if (clonedHand[handIndex] == 0)
                        throw new Error('Error: decrementHand failed.');
                    else
                        clonedHand[handIndex]--;
                    return [clonedHand, handIndex];
                }
            }
            throw new Error('Error: decrementHand failed.');
        };
        Model.getReadyToWinHand = function (completeHand) {
            return Model.decrementHand(completeHand)[0];
        };
        Model.appendHand = function (hand, handIndex) {
            var clonedHand = hand.concat();
            if (clonedHand[handIndex] < 4) {
                clonedHand[handIndex]++;
                return clonedHand;
            }
            return null;
        };
        Model.completeHandsNumber = 14;
        return Model;
    }());
    var View = /** @class */ (function () {
        function View() {
            this._suit = Suit.Characters;
            this._tileSize = TileSize.Medium;
            this._isJapanese = View.isFromJapan();
            this._isSorted = true;
        }
        Object.defineProperty(View.prototype, "suit", {
            get: function () {
                return this._suit;
            },
            set: function (value) {
                this._suit = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(View.prototype, "tileSize", {
            get: function () {
                return this._tileSize;
            },
            set: function (value) {
                this._tileSize = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(View.prototype, "isJapanese", {
            get: function () {
                return this._isJapanese;
            },
            set: function (value) {
                this._isJapanese = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(View.prototype, "isSorted", {
            get: function () {
                return this._isSorted;
            },
            set: function (value) {
                this._isSorted = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(View.prototype, "tileStyle", {
            get: function () {
                switch (this.tileSize) {
                    case TileSize.Small: return "small-tile";
                    case TileSize.Medium: return "medium-tile";
                    case TileSize.Large: return "large-tile";
                }
            },
            enumerable: true,
            configurable: true
        });
        View.prototype.appendHandTo = function (element, hand) {
            var div = this.isSorted ? this.toTileHtml(hand) : this.handIndexesToHtml(Model.shuffledHandIndexes(hand));
            element.append(div);
        };
        View.prototype.appendHandIndexesTo = function (element, handIndexes) {
            var div = this.handIndexesToHtml(handIndexes);
            element.append(div);
        };
        Object.defineProperty(View.prototype, "tileTexts", {
            get: function () {
                switch (this.suit) {
                    case Suit.Bomboos: return View.bambooTileTexts;
                    case Suit.Dots: return View.dotsTileTexts;
                    default: return View.charactersTileTexts;
                }
            },
            enumerable: true,
            configurable: true
        });
        View.prototype.handIndexesToHtml = function (handIndexes) {
            var _this = this;
            var div = $('<div>');
            div.addClass(this.tileStyle);
            handIndexes.forEach(function (handIndex) {
                var tileText = _this.toTileText(handIndex);
                div.append($('<span>').html(tileText));
            });
            return div;
        };
        View.prototype.handIndexToHtml = function (handIndex) {
            var div = $('<div>');
            div.addClass(this.tileStyle);
            var tileText = this.toTileText(handIndex);
            div.append($('<span>').html(tileText));
            return div;
        };
        View.prototype.toTileHtml = function (hand) {
            var _this = this;
            var div = $('<div>');
            div.addClass(this.tileStyle);
            hand.forEach(function (tileNumber, handIndex, self) {
                var tileText = _this.toTileText(handIndex);
                for (var count = 0; count < tileNumber; count++)
                    div.append($('<span>').html(tileText));
            });
            return div;
        };
        View.prototype.toTileText = function (handIndex) {
            return this.tileTexts[handIndex];
        };
        View.isFromJapan = function () {
            var language = (window.navigator.languages && window.navigator.languages[0]) || window.navigator.language;
            return language != null && language.substr(0, 2) === 'ja';
        };
        View.charactersTileTexts = ['&#x1f007;', '&#x1f008;', '&#x1f009;', '&#x1f00a;', '&#x1f00b;', '&#x1f00c;', '&#x1f00d;', '&#x1f00e;', '&#x1f00f;'];
        View.bambooTileTexts = ['&#x1f010;', '&#x1f011;', '&#x1f012;', '&#x1f013;', '&#x1f014;', '&#x1f015;', '&#x1f016;', '&#x1f017;', '&#x1f018;'];
        View.dotsTileTexts = ['&#x1f019;', '&#x1f01a;', '&#x1f01b;', '&#x1f01c;', '&#x1f01d;', '&#x1f01e;', '&#x1f01f;', '&#x1f020;', '&#x1f021;'];
        return View;
    }());
    var Application = /** @class */ (function () {
        function Application() {
            this.model = new Model();
            this.view = new View();
            this.isQuestion = true;
            this.readyToWinHand = [];
            this.questionNumber = 0;
            this.winsNumber = 0;
            this.setHandlers();
            this.setQuestion();
            this.view.isJapanese ? $('input:radio[name="language"]').val(['japanese'])
                : $('input:radio[name="language"]').val(['english']);
            this.updateLanguage();
        }
        Object.defineProperty(Application.prototype, "qustionText", {
            get: function () {
                return this.view.isJapanese ? '聴牌' : 'Ready to win hand';
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Application.prototype, "answerText", {
            get: function () {
                return this.view.isJapanese ? '待ち' : 'Winning tiles';
            },
            enumerable: true,
            configurable: true
        });
        Application.prototype.setHandlers = function () {
            var _this = this;
            $('input:radio[name="usingTile"]').change(function () {
                var value = $('input:radio[name="usingTile"]:checked').val();
                switch (value) {
                    case "characters":
                        _this.view.suit = Suit.Characters;
                        break;
                    case "dots":
                        _this.view.suit = Suit.Dots;
                        break;
                    case "bomboos":
                        _this.view.suit = Suit.Bomboos;
                        break;
                }
            });
            $('input:radio[name="tileSize"]').change(function () {
                var value = $('input:radio[name="tileSize"]:checked').val();
                switch (value) {
                    case "small":
                        _this.view.tileSize = TileSize.Small;
                        break;
                    case "medium":
                        _this.view.tileSize = TileSize.Medium;
                        break;
                    case "large":
                        _this.view.tileSize = TileSize.Large;
                        break;
                }
            });
            $('input:radio[name="language"]').change(function () {
                var value = $('input:radio[name="language"]:checked').val();
                switch (value) {
                    case "japanese":
                        _this.view.isJapanese = true;
                        break;
                    case "english":
                        _this.view.isJapanese = false;
                        break;
                }
                _this.updateLanguage();
            });
            $('input:radio[name="sorting"]').change(function () {
                var value = $('input:radio[name="sorting"]:checked').val();
                switch (value) {
                    case "sorted":
                        _this.view.isSorted = true;
                        break;
                    case "unsorted":
                        _this.view.isSorted = false;
                        break;
                }
            });
            $('#nextButton').on('click', function () {
                _this.isQuestion ? _this.setQuestion()
                    : _this.setAnswer();
                _this.updateQandA();
            });
            $('#answerChecksClear').on('click', function () {
                _this.clearAnswerChecks();
            });
        };
        Application.prototype.setQuestion = function () {
            this.readyToWinHand = this.model.getNewReadyToWinHand();
            $("#hands").html("");
            $("#hands").append('<div>' + this.qustionText + ':</div>');
            this.view.appendHandTo($("#hands"), this.readyToWinHand);
            this.isQuestion = false;
        };
        Application.prototype.setAnswer = function () {
            var handIndexes = Model.makeComplateHandIndexes(this.readyToWinHand);
            $("#hands").append('<div>' + this.answerText + ':</div>');
            this.view.appendHandIndexesTo($("#hands"), handIndexes);
            this.isQuestion = true;
        };
        Application.prototype.clearAnswerChecks = function () {
            $('input[name="answerCheck"]').prop('checked', false);
        };
        Application.prototype.updateQandA = function () {
            this.updateNextButton();
            this.updateAnswerChecks();
            this.updateNumbers();
        };
        Application.prototype.updateNextButton = function () {
            if (this.view.isJapanese)
                $('#nextButton').val(this.isQuestion ? '次の問題' : '待ちを表示');
            else
                $('#nextButton').val(this.isQuestion ? 'Next' : 'Show winning tiles');
        };
        Application.prototype.updateAnswerChecks = function () {
            $('#answerChecks').attr('visibility', this.isQuestion ? 'hidden' : 'visible');
        };
        Application.prototype.updateNumbers = function () {
            $('#winsNumber').text(String(this.winsNumber));
            $('#questionNumber').text(String(this.questionNumber));
        };
        Application.prototype.updateLanguage = function () {
            if (this.view.isJapanese) {
                $('#title').html("麻雀 清一色の練習 | 翔ソフトウェア (Sho's)");
                $('#usingTileLabel').html('牌');
                $('label[for="usingTileCharacters"]').text('萬子');
                $('label[for="usingTileDots"]').text('筒子');
                $('label[for="usingTileBomboos"]').text('索子');
                $('#tileSizeLabel').html('牌の大きさ');
                $('label[for="tileSizeSmall"]').text('小');
                $('label[for="tileSizeMedium"]').text('中');
                $('label[for="tileSizeLarge"]').text('大');
                $('#languageLabel').html('言語 (Language)');
                $('label[for="languageEnglish"]').text('英語 (English)');
                $('label[for="languageJapanese"]').text('日本語 (Japanese)');
                $('#sortingLabel').html('理牌');
                $('label[for="sortingSorted"]').text('あり');
                $('label[for="sortingUnsorted"]').text('なし');
                $('#answerChecksClear').val('クリア');
                $('#winsNumberLabel').html('正解数');
                $('#answerPanel').html('あなたの解答');
            }
            else {
                $('#title').html("Mahjong Flush Practice | Sho's Software");
                $('#usingTileLabel').html('Tiles');
                $('label[for="usingTileCharacters"]').text('Characters');
                $('label[for="usingTileDots"]').text('Dots');
                $('label[for="usingTileBomboos"]').text('Bomboos');
                $('#tileSizeLabel').html('Tile size');
                $('label[for="tileSizeSmall"]').text('Small');
                $('label[for="tileSizeMedium"]').text('Medium');
                $('label[for="tileSizeLarge"]').text('Large');
                $('#languageLabel').html('Language (言語)');
                $('label[for="languageEnglish"]').text('English (英語)');
                $('label[for="languageJapanese"]').text('Japanese (日本語)');
                $('#sortingLabel').html('Sorting');
                $('label[for="sortingSorted"]').text('Sorted');
                $('label[for="sortingUnsorted"]').text('Unsorted');
                $('#answerChecksClear').val('Clear');
                $('#winsNumberLabel').html('Correct Answers');
                $('#answerPanel').html('Your Answer');
            }
            this.updateQandA();
        };
        return Application;
    }());
    Chiniisou.Application = Application;
})(Chiniisou || (Chiniisou = {}));
$(document).ready(function () { return new Chiniisou.Application(); });
//# sourceMappingURL=chiniisou.js.map