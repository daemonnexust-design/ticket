'use client';

import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { getAlertPreferences, updateAlertPreferences } from '@/lib/settings/actions';
import { Button } from '@/components/ui/primitives';

const Container = styled.div`
  background: white;
  border-radius: 8px;
  max-width: 800px;
`;

const Content = styled.div`
  padding: 32px;
`;

// --- Location Section ---
const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: 700;
  color: #1f262d;
  margin-bottom: 8px;
  background: #e5e7eb;
  padding: 8px 16px;
  margin: 0 -32px 16px -32px;
`;

const SectionDescription = styled.p`
  font-size: 16px;
  color: #1f262d;
  line-height: 1.5;
  margin-bottom: 16px;
  max-width: 700px;
`;

const LocationBox = styled.div`
  margin-bottom: 24px;
`;

const LocationText = styled.p`
  font-size: 16px;
  color: #1f262d;
  margin-bottom: 8px;
  
  strong {
      font-weight: 700;
  }
`;

const LinkButton = styled.button`
  background: none;
  border: none;
  color: #026cdf;
  font-size: 16px;
  cursor: pointer;
  padding: 0;
  margin: 0;
  text-decoration: none; // Screenshot doesn't show underline usually until hover
  &:hover {
      text-decoration: underline;
  }
`;

const ZipInput = styled.input`
  padding: 8px;
  border: 1px solid #d0d0d0;
  border-radius: 4px;
  margin-right: 8px;
  width: 100px;
`;

const AddLocationSelect = styled.select`
  padding: 8px;
  border: 1px solid #d0d0d0;
  border-radius: 4px;
  background: #f3f4f6;
  width: 200px;
  margin-left: 8px;
`;

// --- Categories Section ---
const CategoriesGrid = styled.div`
  margin-top: 24px;
`;

const CategoryGroup = styled.div`
  margin-bottom: 24px;
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 24px;
  
  &:last-child {
      border-bottom: none;
  }
`;

const CategoryHeader = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: #1f262d;
  margin-bottom: 16px;
`;

const CheckboxGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 12px;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #1f262d;
  cursor: pointer;
`;

const CheckboxInput = styled.input`
  width: 16px;
  height: 16px;
  cursor: pointer;
  accent-color: #026cdf;
`;

const UpdateButton = styled(Button)`
  width: auto;
  min-width: 200px;
  margin-top: 24px;
`;

// --- Data ---
const CATEGORIES = {
    'Music': ['Alternative Rock', 'Cabaret', 'Classical', 'Comedy', 'Country and Folk', 'Dance/Electronic', 'Festivals', 'Hard Rock/Metal', 'Jazz and Blues', 'K-Pop', 'Latin', 'Miscellaneous', 'New Age and Spiritual', 'R&B/Urban Soul', 'Rap and Hip-Hop', 'Rock and Pop', 'World Music', 'More Concerts'],
    'Sports': ['Baseball', 'Basketball', 'Boxing', 'Bull Riding', 'Competitions', 'Curling', 'Field Sports', 'Football', 'Golf', 'Handball', 'Hockey', 'Lacrosse', 'Mixed Martial Arts', 'Motorsports', 'Rodeo', 'Skating', 'Soccer', 'Tennis', 'Volleyball', 'Wrestling', 'More Sports'],
    'Arts & Theater': ['Broadway', 'Off-Broadway', 'Ballet and Dance', 'Classical', 'Comedy', 'Museums and Exhibits', 'Musicals', 'Opera', 'Plays', 'More Arts and Theater'],
    'Family': ["Children's Music and Theater", 'Circus', 'Fairs and Festivals', 'Family Attractions', 'Ice Shows', 'Magic Shows', 'More Family'],
    'Miscellaneous': ['Casino', 'Expo/Convention', 'Lecture/Seminar', 'Movies']
};

export default function PreferencesPage() {
    // State
    const [zip, setZip] = useState('33127');
    const [locationName, setLocationName] = useState('Greater Miami Area');
    const [isEditingZip, setIsEditingZip] = useState(false);
    const [interests, setInterests] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        getAlertPreferences().then(({ preferences }) => {
            if (preferences) {
                if (preferences.location_zip) setZip(preferences.location_zip);
                if (preferences.location_name) setLocationName(preferences.location_name);
                if (preferences.interests) setInterests(preferences.interests);
            }
            setLoading(false);
        });
    }, []);

    const handleInterestToggle = (category: string) => {
        setInterests(prev => {
            if (prev.includes(category)) {
                return prev.filter(i => i !== category);
            } else {
                return [...prev, category];
            }
        });
    };

    const handleSave = async () => {
        setSaving(true);
        await updateAlertPreferences({
            location_zip: zip,
            location_name: locationName,
            interests: interests
        });
        setSaving(false);
        setIsEditingZip(false);
    };

    if (loading) return <Content>Loading preferences...</Content>;

    return (
        <Container>
            <Content>
                <SectionTitle>Location</SectionTitle>
                <SectionDescription>
                    Select your favorite entertainment categories below and we'll send you a customized TicketAlert email every week about upcoming events in your area. Add a second area to receive event information for another location that interests you.
                </SectionDescription>

                <LocationBox>
                    <LocationText>
                        <strong>{locationName}</strong>
                        <br />
                        Your current zip code is {isEditingZip ? (
                            <ZipInput
                                value={zip}
                                onChange={(e) => setZip(e.target.value)}
                                autoFocus
                            />
                        ) : (
                            <span>{zip}</span>
                        )}
                        (United States Of America).{' '}
                        {isEditingZip ? (
                            <LinkButton onClick={handleSave}>Save</LinkButton>
                        ) : (
                            <LinkButton onClick={() => setIsEditingZip(true)}>Change your zip code.</LinkButton>
                        )}
                    </LocationText>
                    <p style={{ fontSize: '14px', color: '#1f262d', marginBottom: '16px' }}>Note: Changing your zip code will update your profile.</p>

                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <strong>Add a second area</strong>
                        <AddLocationSelect disabled>
                            <option>Select an area</option>
                        </AddLocationSelect>
                    </div>
                </LocationBox>

                <SectionTitle>Categories Of Interest</SectionTitle>
                <SectionDescription>
                    The TicketAlert will be created expressly for you based on the categories of interest selected below.
                </SectionDescription>

                <CategoriesGrid>
                    {Object.entries(CATEGORIES).map(([group, items]) => (
                        <CategoryGroup key={group}>
                            <CategoryHeader>{group}</CategoryHeader>
                            <CheckboxGrid>
                                {items.map(item => (
                                    <CheckboxLabel key={item}>
                                        <CheckboxInput
                                            type="checkbox"
                                            checked={interests.includes(item)}
                                            onChange={() => handleInterestToggle(item)}
                                        />
                                        {item}
                                    </CheckboxLabel>
                                ))}
                            </CheckboxGrid>
                        </CategoryGroup>
                    ))}
                </CategoriesGrid>

                <div style={{ textAlign: 'center', marginTop: '32px' }}>
                    <UpdateButton onClick={handleSave} disabled={saving}>
                        {saving ? 'Updating...' : 'Update Your Interests'}
                    </UpdateButton>
                </div>

            </Content>
        </Container>
    );
}
