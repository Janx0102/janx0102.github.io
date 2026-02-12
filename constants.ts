
import { Paper, NewsEvent, NavLink, SiteConfig } from './types';

export const SITE_CONFIG: SiteConfig = {
  name: "Xinyi Wu",
  description:
    "Master’s student in System Software and Security Group, focusing on cybercrime and AI safety.",
  school: "Fudan University",
  // avatar: "https://picsum.photos/id/64/200/200",
  avatar: "image/xinyi.jpg",
  socials: {
    github: "https://github.com/Janx0102",
    email: "mailto:xinyiwu20@fudan.edu.cn"
  }
};


export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "#/" },
  { label: "News", href: "#/news" },
  { label: "Publications", href: "#/publications" }
];


export const MOCK_PAPERS: Paper[] = [
  {
    id: 'iclr26-prison',
    title: 'PRISON: Unmasking the Criminal Potential of Large Language Models',
    authors: 'Xinyi Wu*, Geng Hong*, Pei Chen, Yueyue Chen, Xudong Pan, Min Yang', // 你若有作者名单我建议补上
    year: 2026,
    venueFull: 'The Fourteenth International Conference on Learning Representations',
    venueShort: "ICLR'26",
    pdfUrl: 'https://arxiv.org/pdf/2506.16150.pdf',
    codeUrl: undefined, // 
    bibtex: `@article{prison2025,
      title   = {PRISON: Unmasking the Criminal Potential of Large Language Models},
      journal = {arXiv preprint arXiv:2506.16150},
      year    = {2025},
      url     = {https://arxiv.org/abs/2506.16150}
    }`,
    abstract:
    `As large language models (LLMs) advance, concerns about their misconduct in complex social contexts intensify. Existing research has overlooked the systematic assessment of LLMs’ criminal potential in realistic interactions, where criminal potential is defined as the risk of producing harmful behaviors such as deception and blame-shifting under adversarial settings that could facilitate unlawful activities. Therefore, we propose a unified framework PRISON, to quantify LLMs' criminal potential across five traits: False Statements, Frame-Up, Psychological Manipulation, Emotional Disguise, and Moral Disengagement. Using structured crime scenarios grounded in reality, we evaluate both criminal potential and anti-crime ability of LLMs. Results show that state-of-the-art LLMs frequently exhibit emergent criminal tendencies, such as proposing misleading statements or evasion tactics, even without explicit instructions. Moreover, when placed in a detective role, models recognize deceptive behavior with only 44% accuracy on average, revealing a striking mismatch between expressing and detecting criminal traits. These findings underscore the urgent need for adversarial robustness, behavioral alignment, and safety mechanisms before broader LLM deployment.`,
  },
  {
    id: 'www26-seo',
    title: 'Unveiling the Resilience of LLM-Enhanced Search Engines Against Black-Hat SEO Manipulation',
    authors:
      'Pei Chen, Geng Hong, Xinyi Wu, Mengying Wu, Zixuan Zhu, Mingxuan Liu, Baojun Liu, Mi Zhang and Min Yang',
    year: 2026,
    venueFull: 'The Web Conference 2026',
    venueShort: "WWW'26",
    ccf: 'A',
    pdfUrl: undefined,
    codeUrl: undefined,
    bibtex: undefined,
    abstract: `The emergence of Large Language Model-enhanced Search Engines (LLMSEs) has revolutionized information retrieval by integrating web-scale search capabilities with AI-powered summarization. While these systems demonstrate improved efficiency over traditional search engines, their security implications against well-established black-hat Search Engine Optimization (SEO) attacks remain unexplored.

    In this paper, we present the first systematic study of SEO attacks targeting LLMSEs. Specifically, we examine ten representative LLMSE products (e.g., ChatGPT, Gemini) and construct SEO-Bench, a benchmark comprising 1,000 real-world black-hat SEO websites, to evaluate both open- and closed-source LLMSEs. Our measurements show that LLMSEs mitigate over 99.78% of traditional SEO attacks, with the phase of retrieval serving as the primary filter, intercepting the vast majority of malicious queries. We further propose and evaluate seven LLMSEO attack strategies, demonstrating that off-the-shelf LLMSEs are vulnerable to LLMSEO attacks, i.e., rewritten-query stuffing and segmented texts double the manipulation rate compared to the baseline. This work offers the first in-depth security analysis of the LLMSE ecosystem, providing practical insights for building more resilient AI-driven search systems. 
    We have responsibly reported the identified issues to major vendors.`
  },
  {
    id: 'icse25-repseo',
    title: 'Exposing the Hidden Layer: Software Repositories in the Service of SEO Manipulation',
    authors:
      'Mengying Wu, Geng Hong, Wuyuao Mai, Xinyi Wu, Lei Zhang, Yingyuan Pu, Huajun Chai, Lingyun Ying, Haixin Duan and Min Yang',
    year: 2025,
    venueFull: 'The 47nd International Conference on Software Engineering',
    venueShort: "IEEE/ACM ICSE'25",
    ccf: 'A',
    pdfUrl: 'https://funeoka-yumee.github.io/assets/files/icse25_repseo.pdf',
    codeUrl: 'https://github.com/Marphownio/RepSEO_Classifier', 
    bibtex: `@inproceedings{wu2025exposing,
      author    = {Mengying Wu and Geng Hong and Wuyuao Mai and Xinyi Wu and Lei Zhang and Yingyuan Pu and Huajun Chai and Lingyun Ying and Haixin Duan and Min Yang},
      title     = {Exposing the Hidden Layer: Software Repositories in the Service of SEO Manipulation},
      year      = {2025}, 
      pages     = {2100--2112}
      booktitle = {Proceedings of the IEEE/ACM 47th International Conference on Software Engineering},
      doi       = {10.1109/ICSE55347.2025.00147},
      isbn      = {979-8-3315-0569-1},
      publisher = {IEEE Computer Society},
      address   = {Los Alamitos, CA, USA},
      month     = May
    }`,
    abstract:`Distinct from traditional malicious packages, this paper uncovers a novel attack vector named “blackhat Search Engine Optimization through REPositories (RepSEO)”. In this approach, attackers carefully craft packages to manipulate search engine results, exploiting the credibility of software repositories to promote illicit websites.
    Our research presents a systematic analysis of the underground ecosystem of RepSEO, identifying key players such as account providers, advertisers, and publishers. We developed an effective detection tool, applied to a ten-year large-scale dataset of npm, Docker Hub, and NuGet software repositories. This investigation led to the startling discovery of 3,801,682 abusive packages, highlighting the widespread nature of this attack.
    Our study also delves into the supply chain tactics of these attacks, revealing strategies like the use of self-hosted email services for account registration, redirection methods to obscure landing pages, and rapid deployment techniques by aggressive attackers. Additionally, we explore the profit motives behind these attacks, identifying two primary types of advertisers: survey-based advertisers and malware distribution advertisers.
    We reported npm, NuGet, and Docker Hub about the RepSEO packages and the related supply chain vulnerabilities of Google, and received their acknowledgments. Software repositories have started removing the abusive packages as of this paper’s submission. We also open-source our code and data to facilitate future research.`
  },  
];


export const MOCK_NEWS: NewsEvent[] = [
  {
    id: 'news-2026-iclr-crime',
    dateLabel: 'Jan. 2026',
    sortDate: '2026-01-26',
    type: 'paper',
    content:
      'Our paper on the criminal potential of large language models has been accepted to ICLR 2026.',
    link: 'https://openreview.net/forum?id=KvOSJpfWqE',
    imageUrl: `image/prison.jpg`,
    imageAlt: 'news-2026-iclr-crime',
  },
  {
    id: 'news-2026-www-seo',
    dateLabel: 'Jan. 2026',
    sortDate: '2026-01-13',
    type: 'paper',
    content:
      'Our paper on the resilience of LLM-enhanced search engines against black-hat SEO manipulation has been accepted to WWW 2026.',
    imageUrl: 'image/llmse.jpg',
    imageAlt: 'news-2026-www-seo',
  },
  {
    id: 'news-2025-webtrap',
    dateLabel: 'Dec. 2025',
    sortDate: '2025-12-01',
    type: 'platform',
    content:
      'Built the first comprehensive evaluation platform WebTrap Park, enabling systematic security benchmarking and analysis for Web Agents.',
    link: 'https://security.fudan.edu.cn/webagent',
    imageUrl: `image/webtrap.jpg`,
    imageAlt: 'news-2025-webtrap',
  },
  {
    id: 'news-2024-icse',
    dateLabel: 'Oct. 2024',
    sortDate: '2024-10-01',
    type: 'paper',
    content:
      'Our paper on black-hat SEO abuse in software repositories has been accepted to ICSE 2025.',
    link: 'https://dl.acm.org/doi/10.1109/ICSE55347.2025.00147',
    imageUrl: `image/repseo.jpg`,
    imageAlt: 'news-2024-icse',
  },
  {
    id: 'news-2024-sslab',
    dateLabel: 'Sept. 2024',
    sortDate: '2024-09-01',
    type: 'general',
    content:
      'Joined the System Software and Security Laboratory at Fudan University to pursue an M.Eng. degree in Cyberspace Security.',
    link: 'https://security.fudan.edu.cn/',
    imageUrl: `image/baize.jpg`,
    imageAlt: 'news-2024-sslab',
  },
  {
    id: 'news-2024-grad',
    dateLabel: 'Jun. 2024',
    sortDate: '2024-06-01',
    type: 'graduation',
    content:
      'Graduated from Fudan University with a B.Sc. degree in Information Security.',
    imageUrl: `image/graduation.jpg`,
    imageAlt: 'news-2024-grad',
  },
  {
    id: 'news-2023-challengecup',
    dateLabel: 'Oct. 2023',
    sortDate: '2023-10-01',
    type: 'award',
    content:
      'Received the Grand Prize (Top Award) in the 18th National “Challenge Cup” Undergraduate Academic and Technology Competition.',
    link: 'https://news.fudan.edu.cn/2023/1109/c5a137904/page.htm',
    imageUrl: `image/zhuyuan.jpg`,
    imageAlt: 'news-2023-challengecup',
  },
];

