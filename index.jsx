import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {
  PieChart,
  Pie,
  Legend,
  Tooltip,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Bar,
  Cell
} from 'Recharts';

class Index extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      twitterData: [],
      searchTerm: "",
      releventTweets: [],
      sentimentData: null
    };

    this.handleChange = this.handleChange.bind(this);
    this.getTweets = this.getTweets.bind(this);
    this.getWatsonData = this.getWatsonData.bind(this);
  }

  handleChange(event) {
    this.setState({searchTerm: event.target.value});
  }

  getTweets() {
    axios.get("http://localhost:3000/tweets/" + this.state.searchTerm).then((response) => {
      //  console.log(response.data.statuses);
      this.setState({twitterData: response.data.statuses});
      this.getWatsonData();
    }).catch(function(error) {
      console.log(error);
    });
  }

  getWatsonData() {
    let tweets = this.state.twitterData.map(tweet => {
      return tweet.text
    }).join("\n");
    axios.get("http://localhost:3000/tone/" + encodeURIComponent(tweets)).then((response) => {
      console.log(response.data);
      this.setState({sentimentData: response.data})
    }).catch(function(error) {
      console.log(error);
    });
  }

  render() {
    const angerValue = this.state.sentimentData === null
      ? 0
      : this.state.sentimentData.document_tone.tone_categories[0].tones[0].score.toFixed(3) * 100
    const disgustValue = this.state.sentimentData === null
      ? 0
      : this.state.sentimentData.document_tone.tone_categories[0].tones[1].score.toFixed(3) * 100
    const fearValue = this.state.sentimentData === null
      ? 0
      : this.state.sentimentData.document_tone.tone_categories[0].tones[2].score.toFixed(3) * 100
    const joyValue = this.state.sentimentData === null
      ? 0
      : this.state.sentimentData.document_tone.tone_categories[0].tones[3].score.toFixed(3) * 100
    const sadnessValue = this.state.sentimentData === null
      ? 0
      : this.state.sentimentData.document_tone.tone_categories[0].tones[4].score.toFixed(3) * 100

    const emotionData = [
      {
        name: 'Anger',
        value: angerValue
      }, {
        name: 'Disgust',
        value: disgustValue
      }, {
        name: 'Fear',
        value: fearValue
      }, {
        name: 'Joy',
        value: joyValue
      }, {
        name: 'Sadness',
        value: sadnessValue
      }
    ]

    const opennessValue = this.state.sentimentData === null
      ? 0
      : this.state.sentimentData.document_tone.tone_categories[2].tones[0].score.toFixed(3) * 100
    const conscientiousValue = this.state.sentimentData === null
      ? 0
      : this.state.sentimentData.document_tone.tone_categories[2].tones[1].score.toFixed(3) * 100
    const extraversionValue = this.state.sentimentData === null
      ? 0
      : this.state.sentimentData.document_tone.tone_categories[2].tones[2].score.toFixed(3) * 100
    const agreeableValue = this.state.sentimentData === null
      ? 0
      : this.state.sentimentData.document_tone.tone_categories[2].tones[3].score.toFixed(3) * 100
    const emotionalrangeValue = this.state.sentimentData === null
      ? 0
      : this.state.sentimentData.document_tone.tone_categories[2].tones[4].score.toFixed(3) * 100

    const socialData = [
      {
        name: 'Openness',
        value: opennessValue
      }, {
        name: 'Conscientiousness',
        value: conscientiousValue
      }, {
        name: 'Extraversion',
        value: extraversionValue
      }, {
        name: 'Agreeableness',
        value: agreeableValue
      }, {
        name: 'Emotional Range',
        value: emotionalrangeValue
      }
    ]

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    return (
      <div>
        <div className="jumbotron">
          <div className="container text-center">
            <h1 className="display-3" style={{
              color: 'white'
            }}>Natural Live Polling</h1>
            <div className='row justify-content-center'>
              <div className='col-6'>
                <p style={{
                  color: 'white'
                }}>Real time analytic data pulled from twitter based on your favorite topics! Type a search term in the box below and visualize the world's response.</p>
              </div>
            </div>
            <div className='row justify-content-center'>
              <div className="input-group col-md-6">
                <input type="text" value={this.state.searchTerm} onChange={this.handleChange} className="form-control input-lg" placeholder="ex. Donald Trump"/>
                <span className="input-group-btn">
                  <button className="btn btn-lg btn-primary" type="button" onClick={this.getTweets}>
                    <i className="fa fa-search" aria-hidden="true"></i>
                  </button>
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-7">
              <h2>Emotional Tone</h2>
              <BarChart width={600} height={450} data={emotionData}>
                <XAxis dataKey="name"/>
                <YAxis type="number" domain={[0,100]} dataKey="value"/>
                <Tooltip/>
                <Bar dataKey="value" fill="#8884d8">
                  <Cell fill={COLORS[0]}/>
                </Bar>
              </BarChart>
            </div>
            <div className="col-5">
              <div className="list-group">
                <div className="list-group-item list-group-item-action flex-column align-items-start">
                  <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">Anger</h5>
                  </div>
                  <p className="mb-1">Likelihood of writer being perceived as angry.</p>
                </div>
                <div className="list-group-item list-group-item-action flex-column align-items-start">
                  <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">Disgust</h5>
                  </div>
                  <p className="mb-1">Likelihood of writer being perceived as disgusted.</p>
                </div>
                <div className="list-group-item list-group-item-action flex-column align-items-start">
                  <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">Fear</h5>
                  </div>
                  <p className="mb-1">Likelihood of writer being perceived as scared.</p>
                </div>
                <div className="list-group-item list-group-item-action flex-column align-items-start">
                  <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">Joy</h5>
                  </div>
                  <p className="mb-1">Joy or happiness has shades of enjoyment, satisfaction and pleasure. There is a sense of well-being, inner peace, love, safety and contentment.</p>
                </div>
                <div className="list-group-item list-group-item-action flex-column align-items-start">
                  <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">Sadness</h5>
                  </div>
                  <p className="mb-1">Likelihood of writer being perceived as sad.</p>
                </div>
              </div>
            </div>
            <div className="col-8">
              <h2>Social Tone</h2>
              <BarChart width={700} height={500} data={socialData}>
                <XAxis dataKey="name"/>
                <YAxis type="number" domain={[0,100]} dataKey="value" />
                <Tooltip/>
                <Bar dataKey="value" fill="#8884d8">
                  <Cell fill={COLORS[0]}/>
                </Bar>
              </BarChart>
            </div>
            <div className="col-4">
              <div className="list-group">
                <div className="list-group-item list-group-item-action flex-column align-items-start">
                  <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">Openness</h5>
                  </div>
                  <p className="mb-1">Writer more likely to be open to experiences for a variety of activities.</p>
                </div>
                <div className="list-group-item list-group-item-action flex-column align-items-start">
                  <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">Conscientiousness</h5>
                  </div>
                  <p className="mb-1">Writer more likely to be someone who would act in a thoughtful and organized way.</p>
                </div>
                <div className="list-group-item list-group-item-action flex-column align-items-start">
                  <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">Extraversion</h5>
                  </div>
                  <p className="mb-1">Writer more likely to seek stimulation in the company of others.</p>
                </div>
                <div className="list-group-item list-group-item-action flex-column align-items-start">
                  <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">Agreeableness</h5>
                  </div>
                  <p className="mb-1">Writer more likely to be compassionate on cooperative towards others.</p>
                </div>
                <div className="list-group-item list-group-item-action flex-column align-items-start">
                  <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">Emotional Range</h5>
                  </div>
                  <p className="mb-1">Writer more likely to be someone who is sensitive to the enviroment.</p>
                </div>
              </div>
            </div>
          </div>
          <hr/>

          <footer>
            <p>&copy; Brandon Watts</p>
          </footer>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <Index/>, document.getElementById('mountNode'));
